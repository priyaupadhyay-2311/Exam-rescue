
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("mobile-open");

});




const navItems = document.querySelectorAll(".nav-link");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("mobile-open");

    });

});




const subjectInput = document.getElementById("subject");
const syllabusInput = document.getElementById("syllabus");
const materialsInput = document.getElementById("materials");
const pyqsInput = document.getElementById("pyqs");
const daysInput = document.getElementById("days");
const createPlanBtn = document.getElementById("createPlanBtn");
const planResult = document.getElementById("planResult");

console.log("Exam Rescue JavaScript connected!");



createPlanBtn.addEventListener("click", function () {

    const subject = subjectInput.value.trim();
    const days = daysInput.value;


    const syllabusText = syllabusInput.value.trim();

    const topics = syllabusText
        .split("\n")
        .map(topic => topic.trim())
        .filter(topic => topic !== "");

    const materialsText = materialsInput.value.trim();

    const materials = materialsText
        .split("\n")
        .map(material => material.trim())
        .filter(material => material !== "");


    const pyqsText = pyqsInput.value.trim();

    const pyqs = pyqsText
        .split("\n")
        .map(question => question.trim())
        .filter(question => question !== "");


    if (subject === "") {

        alert("Please enter a subject.");

        return;
    }

    if (topics.length === 0) {

        alert("Please enter at least one syllabus topic.");

        return;
    }

    const tasks = {

        1: [
            {
                title: "Quick Review",
                description:
                    "Review the most important concepts and focus on the topics most likely to matter."
            }
        ],

        2: [
            {
                title: "Concepts",
                description:
                    "Study the most important concepts and topics."
            },
            {
                title: "Practice",
                description:
                    "Practice important questions and previous year questions."
            }
        ],

        3: [
            {
                title: "Concepts",
                description:
                    "Learn the important concepts and understand the basics."
            },
            {
                title: "Practice",
                description:
                    "Practice important questions and previous year questions."
            },
            {
                title: "Revision",
                description:
                    "Revise everything and test yourself."
            }
        ],

        4: [
            {
                title: "Concepts",
                description:
                    "Cover the important concepts and topics."
            },
            {
                title: "Practice",
                description:
                    "Practice numerical and conceptual questions."
            },
            {
                title: "PYQs",
                description:
                    "Solve previous year questions and focus on weak topics."
            },
            {
                title: "Revision",
                description:
                    "Do a final revision and test yourself."
            }
        ],

        5: [
            {
                title: "Concepts",
                description:
                    "Build your understanding of the important concepts."
            },
            {
                title: "Important Topics",
                description:
                    "Complete the major topics and focus on difficult areas."
            },
            {
                title: "PYQs",
                description:
                    "Practice important questions and previous year questions."
            },
            {
                title: "Revision",
                description:
                    "Revise the topics and solve questions without looking at your notes."
            },
            {
                title: "Final Review",
                description:
                    "Do a final revision, self-test, and review your weak areas."
            }
        ]

    };

    const selectedTasks = tasks[days];


    

    const topicAnalysis = [];

    for (let i = 0; i < topics.length; i++) {

        const topic = topics[i].toLowerCase();

        let matchCount = 0;

        for (let j = 0; j < pyqs.length; j++) {

            const question = pyqs[j].toLowerCase();

            if (question.includes(topic)) {

                matchCount++;

            }
        }


        let priority = "LOW";

        if (matchCount >= 2) {

            priority = "HIGH";

        } else if (matchCount === 1) {

            priority = "MEDIUM";

        }


        topicAnalysis.push({

            name: topics[i],
            matches: matchCount,
            priority: priority

        });

    }


    

    topicAnalysis.sort(function (a, b) {

        return b.matches - a.matches;

    });


    

    const topicMaterials = [];

    for (let i = 0; i < topicAnalysis.length; i++) {

        const topic =
            topicAnalysis[i].name.toLowerCase();

        const matchedMaterials = [];


        for (let j = 0; j < materials.length; j++) {

            const material =
                materials[j].toLowerCase();


            if (
                material.includes(topic) ||
                topic.includes(material)
            ) {

                matchedMaterials.push(materials[j]);

            }

        }


        topicMaterials.push({

            topic: topicAnalysis[i].name,

            materials: matchedMaterials

        });

    }


   

    const totalTopics = topicAnalysis.length;

    const totalDays = selectedTasks.length;

    const baseTopicsPerDay =
        Math.floor(totalTopics / totalDays);

    const extraTopics =
        totalTopics % totalDays;

    let currentTopicIndex = 0;

    let plan = "";


    for (let i = 0; i < totalDays; i++) {

        const topicsForThisDay =
            baseTopicsPerDay +
            (i < extraTopics ? 1 : 0);


        const dayTopics =
            topicAnalysis.slice(
                currentTopicIndex,
                currentTopicIndex + topicsForThisDay
            );


        currentTopicIndex += topicsForThisDay;


        let topicList = "";


       

        for (let j = 0; j < dayTopics.length; j++) {

            const analysis = dayTopics[j];

            const currentTopic = analysis.name;


            

            const topicMaterialData =
                topicMaterials.find(function (item) {

                    return item.topic === currentTopic;

                });



            let action = "Quick review";


            if (analysis.priority === "HIGH") {

                action =
                    "Focus + practice PYQs";

            } else if (analysis.priority === "MEDIUM") {

                action =
                    "Study + practice";

            }


            topicList += `

                <li>

                    <div class="topic-info">

                        <strong class="priority-${analysis.priority.toLowerCase()}">
                            ${analysis.priority}
                        </strong>

                        <span>
                            ${currentTopic}
                        </span>

                    </div>

                    <span class="topic-action">
                        ${action}
                    </span>

                </li>

            `;


            

            if (
                topicMaterialData &&
                topicMaterialData.materials.length > 0
            ) {

                topicList += `

                    <li class="material-match">

                        <span>

                            <i class="fa-solid fa-file-lines"></i>

                            ${topicMaterialData.materials.join(", ")}

                        </span>

                    </li>

                `;

            }

        }


        

        if (dayTopics.length === 0) {

            topicList = `

                <li>

                    <div class="topic-info">

                        <span>
                            Revise previously studied topics
                        </span>

                    </div>

                    <span class="topic-action">
                        Revision
                    </span>

                </li>

            `;

        }



        plan += `

            <div class="plan-day">

                <h3>
                    Day ${i + 1} — ${selectedTasks[i].title}
                </h3>

                <p>
                    ${selectedTasks[i].description}
                </p>

                <ul>
                    ${topicList}
                </ul>

            </div>

        `;

    }


    

    let materialList = "";


    for (let i = 0; i < materials.length; i++) {

        materialList += `

            <li>
                ${materials[i]}
            </li>

        `;

    }


    

    let pyqList = "";


    for (let i = 0; i < pyqs.length; i++) {

        pyqList += `

            <li>
                ${pyqs[i]}
            </li>

        `;

    }



    let priorityList = "";


    for (let i = 0; i < topicAnalysis.length; i++) {

        priorityList += `

            <li>

                ${topicAnalysis[i].name}
                — ${topicAnalysis[i].priority}

                (${topicAnalysis[i].matches} PYQ match${
                    topicAnalysis[i].matches === 1
                        ? ""
                        : "es"
                })

            </li>

        `;

    }


    

    planResult.innerHTML = `

        <h3>
            Your ${subject} Study Plan
        </h3>

        ${plan}


        <div class="plan-day">

            <h3>
                Topic Priority
            </h3>

            <ul>
                ${priorityList}
            </ul>

        </div>


        <div class="plan-day">

            <h3>
                Study Materials
            </h3>

            <ul>

                ${
                    materials.length > 0
                        ? materialList
                        : "<li>No study materials added.</li>"
                }

            </ul>

        </div>


        <div class="plan-day">

            <h3>
                Previous Year Questions
            </h3>

            <ul>

                ${
                    pyqs.length > 0
                        ? pyqList
                        : "<li>No PYQs added.</li>"
                }

            </ul>

        </div>

    `;

});



const aiTestBtn = document.getElementById("aiTestBtn");
const aiResult = document.getElementById("aiResult");

let studyModel = null;



async function loadStudyModel() {

    if (studyModel !== null) {

        return studyModel;

    }

    aiResult.innerHTML = `
        <p>Loading AI Study Coach...</p>
    `;

   studyModel = await window.pipeline(
    "text-generation",
    "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA"
);

    return studyModel;
}



aiTestBtn.addEventListener("click", async function () {

    const subject = subjectInput.value.trim();
    const syllabus = syllabusInput.value.trim();
    const materials = materialsInput.value.trim();
    const pyqs = pyqsInput.value.trim();


    if (subject === "" || syllabus === "") {

        aiResult.innerHTML = `
            <p>
                Please enter your subject and syllabus first.
            </p>
        `;

        return;

    }


    aiTestBtn.disabled = true;

    aiTestBtn.innerHTML = `
        Loading AI...
        <i class="fa-solid fa-spinner fa-spin"></i>
    `;


    try {

        const model = await loadStudyModel();


       const prompt = `
Study coach.

Subject: ${subject}

Topics: ${syllabus}

PYQs: ${pyqs || "None"}

Give exactly 3 short study priorities.
Use only the information above.
Do not repeat the question.
`;

        const result = await model(prompt, {

            max_new_tokens: 80,

            temperature: 0.7

        });


        const generatedText =
            result[0].generated_text;


        aiResult.innerHTML = `

            <div class="ai-response">

                <h4>
                    AI Study Advice
                </h4>

                <p>
                    ${generatedText}
                </p>

            </div>

        `;

    } catch (error) {

        console.error("AI Study Coach error:", error);

        aiResult.innerHTML = `
            <p>
                The AI Study Coach could not load.
                Please check the browser console.
            </p>
        `;

    }


    aiTestBtn.disabled = false;

    aiTestBtn.innerHTML = `
        Ask AI Study Coach
        <i class="fa-solid fa-robot"></i>
    `;

});