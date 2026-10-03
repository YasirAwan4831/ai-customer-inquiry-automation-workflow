// Diagram data transcribed from section 9 (Workflow Diagram) of the source document.
export const mainWorkflow = {
  trunk: [
    ["Customer Sends Message", "Website chat, email, or social media inquiry"],
    ["Message Received by Automation System", "Automation trigger starts the workflow"],
    ["AI Understands and Classifies", "Intent detection and extraction of key details"],
    ["AI Generates Response", "Reply created from approved business information"],
    ["Customer Receives Response", "Professional reply with a clear next step"],
    ["Inquiry Recorded", "Message, classification and details are saved"],
  ],
  decision: ["Decision: Lead, Routine Inquiry, or Complex Case?", "Lead qualification and escalation check"],
  branches: [
    { tag: "YES: Potential Lead", tone: "lead", steps: ["Create / Update Lead Record", "Notify Sales Team", "Human Follow-Up"] },
    { tag: "NO: Routine Inquiry", tone: "routine", steps: ["Record Inquiry", "Continue Normal Support", "Close or Await Next Message"] },
    { tag: "ESCALATE: Complex or Uncertain", tone: "escalate", steps: ["Do Not Guess", "Escalate to Human Team", "Record Inquiry and Reason"] },
  ],
  end: ["Follow-Up Status Tracked", "The inquiry cycle is complete or awaiting human follow-up"],
  note: "Steps 3 and 4 of the nine-step table (classification and extraction) are combined into the diagram boxes for readability. This is a designed workflow and is not a deployed system.",
};
