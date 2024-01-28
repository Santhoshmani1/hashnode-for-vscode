function createProfile(profileDetails, icons) {
  const {
    name,
    tagline,
    followersCount,
    followingCount,
    socialMediaLinks,
    location,
    dateJoined,
    availableFor,
    publications,
    bio,
    profilePicture
  } = profileDetails;

  return `
  <div class="user-info-wrapper">
  <img src="${profilePicture}" alt="profile picture" class="profile-picture"/>
    <div class="user-headline">
      <h2 class="name">${name}</h2>
      <p class="tagline">${tagline}</p>
    </div>
  </div>
  <div class="popularity-container">
    <div class="follower-container"> 
      <p class="follower-count">${followersCount || 0}</p>
      <h3 class="follower-text">Followers</h3>
    </div>
    <div class="following-container">
      <p class="following-count">${followingCount || 0}</p>
      <h3 class="following-text">Following</h3>
    </div>
  </div>
  <div class="links-container">
  ${Object.entries(socialMediaLinks).map(([key, value]) => 
    value ? `
      <span class="link">
        <a href="${value}" target="_blank" rel="noreferrer">
          <img src="${icons && icons[`${key}Icon`] ? icons[`${key}Icon`] : ''}" alt="${key}-icon" class="social-icon" width="20"/>
        </a>
      </span>
    ` : ''
  ).join('')}
  </div>
  <div class="location-container">
    <h3 class="location-text">Location</h3>
    <img src="${icons.locationIcon}" alt="location-icon" class="location-icon" width="20"/>
    <p class="location">${location}</p>
  </div>
  <div class="member-since-container">
    <h3 class="member-since-text">Member Since</h3>
    <img src="${icons.calendarIcon}" alt="calendar-icon" class="calendar-icon" width="20"/>
    <p class="member-since">${new Date(dateJoined).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
  </div>
  <div class="publications-container">
      <h3>Writes at</h3>
      ${publications.edges.map(({ node }) => `
        <div class="publications">
          <p class="publication-title">${node.title}</p>
          <p class="publication-url">${node.url}</p>
        </div>
      `).join('')}
  </div>
    <div class="bio-availablility-wrapper">
      <div class="bio">
        <h3>Bio</h3>
        <p>${bio.text}</p>
      </div>
      <div class="available-for">
        <h3>I am Available for</h3>
        <p>${availableFor}</p>
      </div>
    </div>
    `;
}