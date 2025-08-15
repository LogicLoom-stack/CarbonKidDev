// Hardcoded data for the prototype's logic
const carbonData = {
    'Petrol car (Global Average)': { value: 148, unit: 'g CO₂e/passenger-km' },
    'National rail (Global Average)': { value: 19, unit: 'g CO₂e/passenger-km' },
    'Coach (bus) (Global Average)': { value: 15, unit: 'g CO₂e/passenger-km' },
    'Domestic flight (Global Average)': { value: 123, unit: 'g CO₂e/passenger-km' },
    'Beef burger': { value: 28.8, unit: 'Emissions per 100 grams of protein' },
    'Beef steak': { value: 64.2, unit: 'Emissions per 100 grams of protein' },
    'Chicken breast': { value: 4.5, unit: 'Emissions per 100 grams of protein' },
    'Tofu': { value: 0.6, unit: 'Emissions per 100 grams of protein' },
    'Potatoes': { value: 1.15, unit: 'Emissions per 100 grams of protein' },
    'Rice': { value: 9.1, unit: 'Emissions per 100 grams of protein' },
    'Cow\'s milk': { value: 10.9, unit: 'Emissions per 100 grams of protein' },
    'Almond milk': { value: 13.6, unit: 'Emissions per 100 grams of protein' },
    'Tea': { value: 4257.8, unit: 'Emissions per 100 grams of protein' }
};

const analogyData = {
    'tree': { value: 68, unit: 'g CO₂e', story_template: "That's like a big tree working to clean the air for **{}** days!" },
    'kettle': { value: 70, unit: 'g CO₂e', story_template: "That's like boiling a kettle **{}** times!" },
    'car_km': { value: 170, unit: 'g CO₂e', story_template: "That is like an average car driving **{}** kilometers." },
    'phone_charge': { value: 2, unit: 'g CO₂e', story_template: "That is like charging your smartphone **{}** times!"}
};

// Function to update the unit label based on the selected activity
const updateUnitLabel = () => {
    const selectedActivity = document.getElementById('activity-select').value;
    const unitLabel = document.getElementById('unit-label');
    if (carbonData[selectedActivity].unit.includes('km')) {
        unitLabel.textContent = 'kilometers';
    } else {
        unitLabel.textContent = 'servings';
    }
};

// Event listener for when the activity selection changes
document.getElementById('activity-select').addEventListener('change', updateUnitLabel);

document.getElementById('generate-button').addEventListener('click', () => {
    const activity = document.getElementById('activity-select').value;
    const quantity = parseFloat(document.getElementById('quantity-input').value);
    const storyDisplay = document.getElementById('story-display');

    if (!activity || isNaN(quantity) || quantity <= 0) {
        storyDisplay.innerHTML = "Please select an activity and enter a valid quantity.";
        return;
    }

    const data = carbonData[activity];
    if (!data) {
        storyDisplay.innerHTML = "Couldn't find data for that activity.";
        return;
    }

    const totalCarbonFootprint = data.value * quantity;

    let analogy;
    if (activity.includes('car')) {
        analogy = analogyData.tree;
    } else if (activity.includes('flight')) {
        analogy = analogyData.car_km;
    } else if (activity.includes('rail') || activity.includes('bus')) {
        analogy = analogyData.phone_charge;
    } else {
        // Default for food/other activities
        analogy = analogyData.tree;
    }

    const result = (totalCarbonFootprint / analogy.value).toFixed(1);
    const story = analogy.story_template.replace('{}', result);

    storyDisplay.innerHTML = `
        <p><strong>Your carbon footprint:</strong> ${totalCarbonFootprint.toFixed(1)} ${data.unit}</p>
        <p>${story}</p>
    `;
});

// Set the initial unit label on page load
document.addEventListener('DOMContentLoaded', updateUnitLabel);

// --- TAB NAVIGATION LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.style.display = 'none');
            
            const targetTab = button.getAttribute('data-tab');
            document.getElementById(targetTab).style.display = 'block';
        });
    });

    // Make sure the initial tab is displayed
    document.getElementById('calculator-tab').style.display = 'block';
});

// --- CARBON HERO CHALLENGE LOGIC ---
let heroScore = 0;
let challengesCompleted = 0;
const totalChallenges = 9; // Set to the total number of challenges in your array

const challenges = [
    {
        question: "Your family is planning dinner. What's the best choice for the planet?",
        choiceA: { text: "A yummy plant-based meal", isGood: true, icon: "assets/leaf-icon.png", message: "Amazing! Plant-based meals create much less carbon, making our planet healthier." },
        choiceB: { text: "A big beef burger", isGood: false, icon: "assets/cow-icon-smoke.png", message: "Uh oh! Beef creates a lot of greenhouse gases. A Carbon Hero might choose a plant-based meal instead." }
    },
    {
        question: "You have some leftover food. What's the best way to get rid of it?",
        choiceA: { text: "Throw it in the trash bin", isGood: false, icon: "assets/trash-icon.png", message: "Oh no! Food in the trash creates a powerful gas called methane as it rots. That's not a hero move!" },
        choiceB: { text: "Put it in a compost bin", isGood: true, icon: "assets/compost-icon.png", message: "Awesome! Composting turns food waste into healthy soil and keeps bad gases out of the air. You're a hero!" }
    },
    {
        question: "You're at the store checkout. What's the best bag to use?",
        choiceA: { text: "A reusable cloth bag", isGood: true, icon: "assets/reusable-bag-icon.png", message: "Perfect! Reusable bags help reduce plastic waste and the carbon from making new bags. Way to go!" },
        choiceB: { text: "A plastic bag", isGood: false, icon: "assets/plastic-bag-icon.png", message: "Oops! Plastic bags create carbon pollution when they are made. A hero always brings their own reusable bag." }
    },
    {
        question: "It's a hot day and you feel warm. What's the best way to stay cool?",
        choiceA: { text: "Turn on the AC", isGood: false, icon: "assets/ac-icon.png", message: "AC uses a lot of electricity, which often comes from fossil fuels. Let's try to save energy when we can!" },
        choiceB: { text: "Open a window or use a fan", isGood: true, icon: "assets/fan-icon.png", message: "Great choice! Fans and open windows use much less energy, which helps our planet." }
    },
    {
        question: "Your old toy broke. What's the best thing to do?",
        choiceA: { text: "Throw it away and buy a new one", isGood: false, icon: "assets/trash-toy-icon.png", message: "Throwing things away creates more waste. Making new things also uses a lot of energy and resources." },
        choiceB: { text: "Try to repair it or give it to a friend", isGood: true, icon: "assets/wrench-icon.png", message: "Excellent! Repairing things saves resources and reduces waste. You're a true hero!" }
    },
    {
        question: "You're going to a friend's house a few blocks away. What's the best choice?",
        choiceA: { text: "Ask for a ride in the car", isGood: false, icon: "assets/car-icon.png", message: "Even a short car ride releases carbon. Plus, walking is great for our bodies!" },
        choiceB: { text: "Walk or ride a bike", isGood: true, icon: "assets/bike-icon.png", message: "Yes! Walking or biking produces zero carbon. You just saved the planet!" }
    },
    // NEW DEFORESTATION CHALLENGES
    {
        question: "A company wants to make food for animals. What's the best way to get the ingredients?",
        choiceA: { text: "Clear a forest to plant crops", isGood: false, icon: "assets/soy-icon.png", message: "Uh oh! Most of the soy and other crops grown in cleared forests are used to feed animals. That's a huge cause of deforestation!" },
        choiceB: { text: "Plant foods that people can eat directly", isGood: true, icon: "assets/plant-icon.png", message: "Awesome! Growing food for people saves land and helps save our forests." }
    },
    {
        question: "You're building a new bookshelf. What's the best wood to use?",
        choiceA: { text: "Wood from a newly cut rainforest tree", isGood: false, icon: "assets/wood-cut-icon.png", message: "Uh oh! Cutting down a rainforest tree for wood harms the climate and animals. Let's find a better way!" },
        choiceB: { text: "Wood from a recycled or sustainable source", isGood: true, icon: "assets/recycled-wood-icon.png", message: "Yes! Choosing recycled or sustainable wood saves our old forests and the plants and animals that live there." }
    },
    {
        question: "You want a snack. What's the best snack for the planet?",
        choiceA: { text: "A snack with ingredients that clear rainforests", isGood: false, icon: "assets/palm-oil-icon.png", message: "Oops! Some snacks use ingredients like palm oil that can cause deforestation. Look for a better choice next time!" },
        choiceB: { text: "A snack with ingredients that don't harm forests", isGood: true, icon: "assets/forest-friendly-icon.png", message: "Perfect! Choosing a snack that doesn't harm our forests is a hero move for the planet." }
    }
];

const storybookData = {
    hero: {
        title: "The Legend of the Carbon Hero!",
        story: "Once upon a time, there was a hero who made great choices for our planet. They chose to eat delicious plant-based foods, ride their bike instead of driving, and even became a master of recycling! Their actions helped trees grow bigger and stronger, the air become cleaner, and all the animals to live happily. Thank you for being a true Carbon Hero and making a difference!"
    },
    regular: {
        title: "The Good Choices Story!",
        story: "You made some good choices for the planet today! Remember that every small action, like choosing to walk or saving energy, helps our planet in a big way. Keep up the good work and you'll be a hero in no time!"
    },
    learning: {
        title: "The Planet-Saver's Guide!",
        story: "Today was a good day to learn about our planet. It's okay to not get every choice right, because every time we learn, we get a little bit better. Keep making good choices, and you will become a hero to the Earth!"
    }
};

const questionEl = document.getElementById('challenge-question');
const cardFrontIcon = document.getElementById('front-icon');
const backIcon = document.getElementById('back-icon');
const backMessage = document.getElementById('back-message');
const choiceAButton = document.getElementById('choice-a-button');
const choiceBButton = document.getElementById('choice-b-button');
const challengeCard = document.getElementById('challenge-card');

const loadChallenge = (index) => {
    const challenge = challenges[index];
    questionEl.textContent = challenge.question;
    cardFrontIcon.src = "assets/default_icon.png";
    backIcon.src = "";
    backMessage.textContent = "";
    choiceAButton.textContent = challenge.choiceA.text;
    choiceBButton.textContent = challenge.choiceB.text;
    choiceAButton.classList.remove('good-choice', 'bad-choice');
    choiceBButton.classList.remove('good-choice', 'bad-choice');
    
    challengeCard.classList.remove('is-flipped');
};

const displayStorybook = () => {
    const storybookContainer = document.getElementById('storybook-container');
    const storybookText = document.getElementById('storybook-text');
    const challengeSection = document.querySelector('.carbon-hero-challenge');

    challengeSection.style.display = 'none'; // Hide the challenges

    let story;
    if (heroScore === totalChallenges) {
        story = storybookData.hero;
    } else if (heroScore >= Math.ceil(totalChallenges / 2)) {
        story = storybookData.regular;
    } else {
        story = storybookData.learning;
    }

    storybookText.innerHTML = `<h3>${story.title}</h3><p>${story.story}</p>`;
    storybookContainer.style.display = 'block'; // Show the storybook
};

const handleChoice = (choice) => {
    const challenge = challenges[challengesCompleted];
    
    if (choice.isGood) {
        heroScore++;
        backIcon.src = `assets/${choice.icon}`;
    } else {
        backIcon.src = `assets/${choice.icon}`;
    }
    backMessage.innerHTML = choice.message;
    
    challengeCard.classList.add('is-flipped');

    if (choice.isGood) {
        if (choice === challenge.choiceA) {
            choiceAButton.classList.add('good-choice');
            choiceBButton.classList.add('bad-choice');
        } else {
            choiceBButton.classList.add('good-choice');
            choiceAButton.classList.add('bad-choice');
        }
    } else {
        if (choice === challenge.choiceA) {
            choiceAButton.classList.add('bad-choice');
            choiceBButton.classList.add('good-choice');
        } else {
            choiceBButton.classList.add('bad-choice');
            choiceAButton.classList.add('good-choice');
        }
    }

    challengesCompleted++;

    setTimeout(() => {
        if (challengesCompleted < totalChallenges) {
            loadChallenge(challengesCompleted);
        } else {
            displayStorybook();
        }
    }, 4000); // Loads next challenge or storybook after 4 seconds
};

choiceAButton.addEventListener('click', () => {
    handleChoice(challenges[currentChallengeIndex].choiceA);
});

choiceBButton.addEventListener('click', () => {
    handleChoice(challenges[currentChallengeIndex].choiceB);
});

// Load the first challenge when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateUnitLabel();
    loadChallenge(currentChallengeIndex);
});