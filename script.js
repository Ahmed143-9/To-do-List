const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value.trim() ===''){
        alert("You must write something");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
inputBox.value = '';

saveData();


    
} 


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
 
showTask();

// Clear All Button Implementation
function clearAllTasks() {
    listContainer.innerHTML = ''; // Clear all tasks from the list
    localStorage.removeItem('data'); // Remove the saved tasks from localStorage
}

// Add event listener to the Clear All button
document.getElementById("clear-all").addEventListener("click", clearAllTasks);


// Get references to the elements
const addProfileBtn = document.getElementById('add-profile-btn');
const updateProfileBtn = document.getElementById('update-profile-btn');
const profileModal = document.getElementById('profile-modal');
const profileForm = document.getElementById('profile-form');

// Function to open the profile modal
function openProfileModal() {
    profileModal.style.display = 'block'; // Show the modal

    // Populate the form with existing profile data for editing
    const savedProfileData = localStorage.getItem('profileData');
    if (savedProfileData) {
        const profileData = JSON.parse(savedProfileData);
        document.getElementById('name').value = profileData.name; // Set name input
        document.getElementById('position').value = profileData.position; // Set position input
    } else {
        // Clear the fields if there's no saved data
        document.getElementById('name').value = '';
        document.getElementById('position').value = '';
    }
}

// Open the modal when "Add Your Profile" button is clicked
addProfileBtn.addEventListener('click', openProfileModal);

// Handle form submission inside the modal
profileForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from reloading the page

    // Get the form values
    const imageInput = document.getElementById('profile-image');
    const nameInput = document.getElementById('name').value;
    const positionInput = document.getElementById('position').value;

    // Validate that all inputs are filled
    if (!imageInput.files[0] || nameInput.trim() === '' || positionInput.trim() === '') {
        alert('Please fill in all fields.');
        return; // Stop if validation fails
    }

    // Show the uploaded image preview
    const profileImage = document.getElementById('profile-image-preview');
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const imageData = reader.result;
        profileImage.src = imageData; // Set the image preview

        // Save the profile data to localStorage
        const profileData = {
            profileImage: imageData,
            name: nameInput,
            position: positionInput
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));

        // After submission, hide the modal and update button visibility
        profileModal.style.display = 'none'; // Hide the modal
        addProfileBtn.style.display = 'none'; // Hide "Add Your Profile" button
        updateProfileBtn.style.display = 'inline-block'; // Show "Update Your Profile" button
    };
    reader.readAsDataURL(file);
});

// On page load, fetch profile data from localStorage
window.onload = function() {
    const savedProfileData = localStorage.getItem('profileData');
    if (savedProfileData) {
        const profileData = JSON.parse(savedProfileData);

        // Update the profile section with saved data
        const profileImage = document.getElementById('profile-image-preview');
        const profileName = document.getElementById('profile-name');
        const profilePosition = document.getElementById('profile-position');

        profileImage.src = profileData.profileImage || 'default.jpg'; // Fallback if no image
        profileName.textContent = profileData.name || 'Default Name';
        profilePosition.textContent = profileData.position || 'Position';

        // Show "Update Profile" button if profile data exists
        addProfileBtn.style.display = 'none';
        updateProfileBtn.style.display = 'inline-block';
    }
};

// Open the profile modal when "Update Your Profile" button is clicked
updateProfileBtn.addEventListener('click', openProfileModal);


