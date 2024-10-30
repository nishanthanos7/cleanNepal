document.addEventListener("DOMContentLoaded", function () {
  // Responsive navigation
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      navMenu.classList.remove("active");
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Animated statistics
  function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const element = document.getElementById(id);
    if (!element) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Simulate loading data and animate statistics
  setTimeout(() => {
    animateValue("air-quality-stat", 0, 150, 2000); // AQI value (higher is worse)
    animateValue("plastic-waste-stat", 0, 16000, 2000); // Tons of plastic waste per year
  }, 1000);

  // Intersection Observer for fade-in effect
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(
      ".section-title, .pollution-type, .energy-type, .action, .resource"
    )
    .forEach((element) => {
      observer.observe(element);
    });

  // Quiz functionality
  const quizData = [
    {
      question: "What is the main cause of air pollution in Kathmandu?",
      choices: [
        "Vehicle emissions",
        "Factory smoke",
        "Burning trash",
        "Dust storms",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which river in Nepal is considered one of the most polluted?",
      choices: [
        "Koshi River",
        "Gandaki River",
        "Bagmati River",
        "Karnali River",
      ],
      correctAnswer: 2,
    },
  ];

  let currentQuestion = 0;
  const quizElement = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitButton = document.getElementById("submit");
  const resultElement = document.getElementById("result");

  function loadQuestion() {
    if (!quizElement) return;

    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("quiz-choice");
      button.addEventListener("click", () => selectChoice(index));
      choicesElement.appendChild(button);
    });
    submitButton.style.display = "none";
    resultElement.textContent = "";
  }

  function selectChoice(index) {
    document
      .querySelectorAll(".quiz-choice")
      .forEach((button) => button.classList.remove("selected"));
    document.querySelectorAll(".quiz-choice")[index].classList.add("selected");
    submitButton.style.display = "block";
  }

  if (submitButton) {
    submitButton.addEventListener("click", () => {
      const selected = document.querySelector(".quiz-choice.selected");
      if (selected) {
        const selectedIndex = Array.from(selected.parentNode.children).indexOf(
          selected
        );
        if (selectedIndex === quizData[currentQuestion].correctAnswer) {
          resultElement.textContent = "Correct! 🎉";
          resultElement.style.color = "green";
        } else {
          resultElement.textContent = "Incorrect. Try again! 😕";
          resultElement.style.color = "red";
        }
        currentQuestion = (currentQuestion + 1) % quizData.length;
        setTimeout(loadQuestion, 1500);
      }
    });
  }

  if (quizElement) {
    loadQuestion();
  }

  // Renewable Energy Map
  const mapContainer = document.getElementById("energy-map");
  if (mapContainer) {
    const mapImage = document.createElement("img");
    mapImage.src =
      "https://pfan.net/wp-content/uploads/2020/09/AdobeStock_301038151-3.jpg";
    mapImage.alt = "Map of Renewable Energy Projects in Nepal";
    mapImage.style.width = "100%";
    mapImage.style.height = "auto";
    mapImage.style.maxHeight = "400px";
    mapImage.style.objectFit = "cover";
    mapImage.style.borderRadius = "10px";
    mapContainer.appendChild(mapImage);

    const projects = [
      { name: "Upper Tamakoshi Hydropower", location: { x: 70, y: 30 } },
      { name: "Dhaulagiri Solar Farm", location: { x: 30, y: 60 } },
      { name: "Kagbeni Wind Farm", location: { x: 80, y: 40 } },
    ];

    projects.forEach((project) => {
      const marker = document.createElement("div");
      marker.classList.add("map-marker");
      marker.style.position = "absolute";
      marker.style.left = `${project.location.x}%`;
      marker.style.top = `${project.location.y}%`;
      marker.style.width = "10px";
      marker.style.height = "10px";
      marker.style.backgroundColor = "red";
      marker.style.borderRadius = "50%";
      marker.title = project.name;
      mapContainer.appendChild(marker);
    });
  }

  // Volunteer Opportunities
  const volunteerSection = document.getElementById("volunteer-section");
  if (volunteerSection) {
    const opportunities = [
      "Join local clean-up drives in Kathmandu 🧹",
      "Educate school children about waste management 🏫",
      "Plant trees in deforested areas 🌳",
      "Assist in setting up solar panels in rural areas ☀️",
    ];

    opportunities.forEach((opportunity) => {
      const p = document.createElement("p");
      p.textContent = opportunity;
      volunteerSection.appendChild(p);
    });
  }

  // Success Stories Carousel
  const carousel = document.getElementById("story-carousel");
  if (carousel) {
    const stories = [
      {
        before:
          "https://nepal.peopleinneed.net/_image-lazy?image=image%2F341bm5vdup7oj5ofg3881igh43&width=1200&height=628&quality=90&type=crop&origin=canto&crop%5Babsolute%5D=1&crop%5Bwidth%5D=0&crop%5Bheight%5D=280&crop%5Bsize%5D%5Bwidth%5D=2050&crop%5Bsize%5D%5Bheight%5D=1073",
        after:
          "https://a.storyblok.com/f/287471/2048x1364/e237b0cb48/gpjnews_nepal_sn_squattersettlement_273_web.JPG",
        description: "River clean-up project",
      },
      {
        before:
          "https://images.pexels.com/photos/9799706/pexels-photo-9799706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        after:
          "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Solar panel installation",
      },
      {
        before:
          "https://wwfasia.awsassets.panda.org/img/original/kabita_kunwar__left__and_pradeep_rijal__youth_tiger_ambassadors_of_wwf_nepal__planting_a.jpg",
        after:
          "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Reforestation effort",
      },
    ];

    stories.forEach((story) => {
      const storyElement = document.createElement("div");
      storyElement.classList.add("story-item");

      const beforeImg = document.createElement("img");
      beforeImg.src = story.before;
      beforeImg.alt = `Before: ${story.description}`;

      const afterImg = document.createElement("img");
      afterImg.src = story.after;
      afterImg.alt = `After: ${story.description}`;

      const description = document.createElement("p");
      description.textContent = story.description;

      storyElement.appendChild(beforeImg);
      storyElement.appendChild(afterImg);
      storyElement.appendChild(description);
      carousel.appendChild(storyElement);
    });
  }
});
