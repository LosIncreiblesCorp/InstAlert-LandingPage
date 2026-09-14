from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
NAVY = colors.HexColor("#0F172A")
BLUE = colors.HexColor("#2563EB")
RED = colors.HexColor("#DC2626")
MUTED = colors.HexColor("#596477")
LINE = colors.HexColor("#E2E7EF")

styles = getSampleStyleSheet()
title = ParagraphStyle("Title", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=25, leading=30, textColor=NAVY, alignment=TA_CENTER, spaceAfter=12)
subtitle = ParagraphStyle("Subtitle", parent=styles["Normal"], fontName="Helvetica", fontSize=11, leading=16, textColor=MUTED, alignment=TA_CENTER, spaceAfter=26)
heading = ParagraphStyle("Heading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=BLUE, spaceBefore=18, spaceAfter=8)
body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10, leading=16, textColor=NAVY, spaceAfter=9)
small = ParagraphStyle("Small", parent=body, fontSize=8, leading=11, textColor=MUTED)


def p(text, style=body):
    return Paragraph(text, style)


def header_footer(canvas, document):
    canvas.saveState()
    width, height = LETTER
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 0.18 * inch, width, 0.18 * inch, stroke=0, fill=1)
    canvas.setStrokeColor(LINE)
    canvas.line(0.65 * inch, 0.55 * inch, width - 0.65 * inch, 0.55 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(0.65 * inch, 0.34 * inch, "LosIncreiblesCorp | InstAlert")
    canvas.drawRightString(width - 0.65 * inch, 0.34 * inch, f"Page {document.page}")
    canvas.restoreState()


def make_pdf(filename, title_text, intro, sections):
    document = SimpleDocTemplate(str(DOCS / filename), pagesize=LETTER, rightMargin=0.7 * inch, leftMargin=0.7 * inch, topMargin=0.65 * inch, bottomMargin=0.75 * inch, title=title_text, author="LosIncreiblesCorp")
    story = [Spacer(1, 0.25 * inch), p("InstAlert", ParagraphStyle("Brand", parent=title, fontSize=12, leading=15, textColor=RED, spaceAfter=10)), p(title_text, title), p(intro, subtitle)]
    for section_title, paragraphs in sections:
        story.append(p(section_title, heading))
        for paragraph in paragraphs:
            story.append(p(paragraph))
    story.append(Spacer(1, 0.25 * inch))
    story.append(p("This document is provided by LosIncreiblesCorp for InstAlert subscribers and visitors. Replace this placeholder policy content with approved legal or support copy before publication.", small))
    document.build(story, onFirstPage=header_footer, onLaterPages=header_footer)


make_pdf(
    "help-center.pdf",
    "Help Center",
    "Guidance for businesses using InstAlert to stay informed, connected, and prepared.",
    [
        ("Getting started", ["Choose a paid subscription plan, complete your business profile, and invite the operational staff who should receive relevant alerts.", "Set your business location and notification preferences so nearby security information reaches the right people."]),
        ("Using InstAlert", ["Review nearby alerts, open the incident details, and use the panic workflow when an urgent situation requires a direct response.", "Use the local risk view and historical alert record to identify recurring situations around your business."]),
        ("Need assistance?", ["Contact LosIncreiblesCorp through the Let’s Talk form on the InstAlert website. Include your business name, subscription plan, and a clear description of the request."]),
    ],
)

make_pdf(
    "privacy-policy.pdf",
    "Privacy Policy",
    "A placeholder privacy notice for the InstAlert commercial SaaS product.",
    [
        ("Information we handle", ["InstAlert may process account details, business information, user contact details, location-related alert information, and activity needed to provide the subscribed service."]),
        ("How information is used", ["Information is used to operate the platform, route relevant security alerts, support subscribed businesses, maintain service reliability, and improve product performance."]),
        ("Your responsibilities", ["Business administrators should invite only authorized staff, keep account credentials protected, and avoid entering sensitive information that is not needed for an alert or support request."]),
        ("Questions", ["Contact LosIncreiblesCorp through the official contact channel listed on the InstAlert website for privacy questions or requests."]),
    ],
)

make_pdf(
    "terms-of-service.pdf",
    "Terms of Service",
    "A placeholder terms document for paid access to InstAlert.",
    [
        ("Subscription access", ["InstAlert is available through paid subscription plans. The subscribing business is responsible for selecting a plan, maintaining billing details, and managing authorized users."]),
        ("Acceptable use", ["Subscribers must use InstAlert for legitimate business security coordination, protect account access, and avoid misuse that could disrupt the service or expose other businesses to unnecessary risk."]),
        ("Alerts and decisions", ["InstAlert provides information and coordination tools. Subscribers remain responsible for evaluating alerts, following their own safety procedures, and contacting emergency services when appropriate."]),
        ("Support and updates", ["LosIncreiblesCorp may update product capabilities, support procedures, and these terms as the service evolves. Approved commercial terms should replace this placeholder before publication."]),
    ],
)
