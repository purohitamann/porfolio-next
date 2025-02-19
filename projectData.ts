const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      name: "Brain Tumor Classification Model",
      problemStatement: "Brain tumor detection using machine learning is crucial for early diagnosis but remains challenging due to variability in imaging data.",
      solution: "A classification model utilizing Streamlit, Python, TensorFlow, and Gemini to automate tumor detection from MRI scans.",
      githubLink: "https://github.com/purohitamann/BrainTumorClassficationModel",
      likes: 0,
      tags: ["AI", "Machine Learning", "Medical Imaging", "TensorFlow"],
      technologiesUsed: ["Streamlit", "Python", "TensorFlow", "Gemini"],
      futureIteration: "Improve accuracy by incorporating a larger dataset and advanced deep learning techniques."
    },
    {
      name: "ALT - PR Review Agent",
      problemStatement: "Code review is often time-consuming, and identifying issues in PRs requires manual effort.",
      solution: "A PR review agent leveraging Groq, TypeScript, and GitHub API to provide automated insights on code changes.",
      githubLink: "https://github.com/purohitamann/PR-ReviewAgent",
      likes: 0,
      tags: ["Automation", "Code Review", "GitHub API"],
      technologiesUsed: ["TypeScript", "Groq", "GitHub API"],
      futureIteration: "Enhance AI capabilities for detecting complex code issues and suggest best practices."
    },
    {
      name: "Sheridan Swiftie Club Portal",
      problemStatement: "Student clubs need an efficient platform to manage events, members, and announcements.",
      solution: "A web portal built using React (Next.js), Tailwind, and Firebase to facilitate club activities and communication.",
      githubLink: "https://github.com/purohitamann/sheridan-swiftie-club",
      likes: 0,
      tags: ["Community", "Web Development", "Club Management"],
      technologiesUsed: ["React(Next.js)", "Tailwind", "Firebase"],
      futureIteration: "Integrate real-time chat and event RSVP system."
    },
    {
      name: "Customer Churn Prediction Model",
      problemStatement: "Businesses struggle to identify customers likely to churn, leading to revenue loss.",
      solution: "A predictive model using Streamlit, Python, Llama, Pandas, and Matplotlib to analyze customer behavior and forecast churn.",
      githubLink: "https://github.com/purohitamann/ChurnPredictionModel",
      likes: 0,
      tags: ["Data Science", "Predictive Analytics", "Customer Retention"],
      technologiesUsed: ["Streamlit", "Python", "Llama", "Pandas", "Matplotlib"],
      futureIteration: "Enhance model accuracy by incorporating deep learning and real-time analytics."
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
    console.log(`Added project: ${project.name}`);
  }
}

main()
  .catch((error) => console.error("Error adding projects:", error))
  .finally(async () => await prisma.$disconnect());
