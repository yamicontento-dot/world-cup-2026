import { worldCupData } from './data.js';

let appState = {
  groups: [],
  matches: []
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  setupNavigation();
  renderAll();
});

function loadState() {
  const saved = localStorage.getItem('worldCupState2026_v6');
  if (saved) {
    appState = JSON.parse(saved);
  } else {
    // Deep copy initial data
    appState = JSON.parse(JSON.stringify(worldCupData)); 
  }
}

function saveState() {
  localStorage.setItem('worldCupState2026_v6', JSON.stringify(appState));
}

function renderAll() {
  calculateStandings();
  renderGroups();
  renderMatches();
  renderBracket();
}

function calculateStandings() {
  // Reset stats
  appState.groups.forEach(group => {
    group.teams.forEach(team => {
      team.played = 0; team.won = 0; team.drawn = 0; team.lost = 0;
      team.goalsFor = 0; team.goalsAgainst = 0; team.points = 0;
      team.status = 'dispute';
    });
  });

  // Calculate from saved matches
  appState.matches.forEach(match => {
    if (match.score1 !== null && match.score2 !== null && match.score1 !== '' && match.score2 !== '') {
      const group = appState.groups.find(g => g.name === match.groupId);
      if (!group) return;
      
      const t1 = group.teams.find(t => t.id === match.team1.id);
      const t2 = group.teams.find(t => t.id === match.team2.id);
      
      if (!t1 || !t2) return;

      const s1 = parseInt(match.score1);
      const s2 = parseInt(match.score2);

      t1.played++; t2.played++;
      t1.goalsFor += s1; t1.goalsAgainst += s2;
      t2.goalsFor += s2; t2.goalsAgainst += s1;

      if (s1 > s2) {
        t1.won++; t1.points += 3;
        t2.lost++;
      } else if (s2 > s1) {
        t2.won++; t2.points += 3;
        t1.lost++;
      } else {
        t1.drawn++; t2.drawn++;
        t1.points += 1; t2.points += 1;
      }
    }
  });

  // Calculate Mathematical Status
  appState.groups.forEach(group => {
    // Sort teams to find positions
    const sorted = [...group.teams].sort((a, b) => b.points - a.points);
    
    group.teams.forEach(team => {
      const maxPossiblePoints = team.points + ((3 - team.played) * 3);
      
      if (team.points >= 6) {
        // Historically and mathematically, 6 points guarantees at least a Top 3 advancing spot
        team.status = 'qualified';
      } else if (team.played >= 2 && team.points === 0) {
        // 0 points after 2 games virtually eliminates a team due to goal difference and 3rd place cutoffs
        team.status = 'eliminated';
      } else if (team.played === 3 && maxPossiblePoints < sorted[2].points) {
        // Strict math: if all games played and points less than 3rd place
        team.status = 'eliminated';
      } else {
        team.status = 'dispute';
      }
    });
  });
}

function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.view-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = '';

  appState.groups.forEach(group => {
    // Sort teams by points, then goal difference, then goals scored
    const sortedTeams = [...group.teams].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.goalsFor - a.goalsAgainst;
      const gdB = b.goalsFor - b.goalsAgainst;
      if (gdB !== gdA) return gdB - gdA;
      return b.goalsFor - a.goalsFor;
    });

    const groupCard = document.createElement('div');
    groupCard.className = 'group-card';
    
    let tableRows = '';
    sortedTeams.forEach((team, index) => {
      let statusBadge = '';
      let rowClass = '';
      
      if (team.status === 'qualified') {
        statusBadge = '<span class="badge badge-qualified">CLASIFICADO</span>';
        rowClass = 'row-qualified';
      } else if (team.status === 'eliminated') {
        statusBadge = '<span class="badge badge-eliminated">ELIMINADO</span>';
        rowClass = 'row-eliminated';
      } else {
        statusBadge = '<span class="badge badge-dispute">EN DISPUTA</span>';
      }

      tableRows += `
        <tr class="${rowClass}">
          <td>${index + 1}</td>
          <td class="team-col">
            <span class="flag">${team.flag}</span>
            <span>${team.name}</span>
            ${statusBadge}
          </td>
          <td>${team.played}</td>
          <td>${team.goalsFor - team.goalsAgainst}</td>
          <td class="team-pts">${team.points}</td>
        </tr>
      `;
    });

    groupCard.innerHTML = `
      <h3 class="group-header">${group.name}</h3>
      <table class="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th class="team-col">Team</th>
            <th>P</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    container.appendChild(groupCard);
  });
}

function renderMatches() {
  const container = document.getElementById('matches-container');
  container.innerHTML = '';

  // Sort matches by date
  const sortedMatches = [...appState.matches].sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedMatches.forEach(match => {
    const card = document.createElement('div');
    card.className = 'match-card';
    
    const dateStr = new Date(match.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    
    card.innerHTML = `
      <div class="match-header">
        <span>${dateStr}</span>
        <span>${match.groupId}</span>
      </div>
      <div class="match-teams">
        <div class="match-team">
          <div class="team-info">
            <span class="flag">${match.team1.flag}</span>
            <span>${match.team1.name}</span>
          </div>
          <input type="number" min="0" class="score-input score1" value="${match.score1 !== null ? match.score1 : ''}" data-id="${match.id}">
        </div>
        <div class="match-team">
          <div class="team-info">
            <span class="flag">${match.team2.flag}</span>
            <span>${match.team2.name}</span>
          </div>
          <input type="number" min="0" class="score-input score2" value="${match.score2 !== null ? match.score2 : ''}" data-id="${match.id}">
        </div>
      </div>
      <div class="match-actions">
        <button class="save-btn ${match.score1 !== null ? 'saved' : ''}" data-id="${match.id}">${match.score1 !== null ? 'Saved ✓' : 'Save Score'}</button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event listeners for Save buttons
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const matchId = parseInt(e.target.getAttribute('data-id'));
      const card = e.target.closest('.match-card');
      const score1Val = card.querySelector('.score1').value;
      const score2Val = card.querySelector('.score2').value;

      if (score1Val === '' || score2Val === '') {
        alert('Please enter valid scores for both teams.');
        return;
      }

      // Update state
      const match = appState.matches.find(m => m.id === matchId);
      if (match) {
        match.score1 = parseInt(score1Val);
        match.score2 = parseInt(score2Val);
        saveState();
        
        // Visual feedback
        e.target.textContent = 'Saved ✓';
        e.target.classList.add('saved');
        
        // Re-render other views to reflect changes
        renderAll();
      }
    });
  });
}

function renderBracket() {
  const container = document.getElementById('bracket-container');
  
  // Check if all matches are played
  const totalMatches = appState.matches.length;
  const playedMatches = appState.matches.filter(m => m.score1 !== null && m.score2 !== null && m.score1 !== '' && m.score2 !== '').length;
  
  if (playedMatches < totalMatches) {
    container.innerHTML = `
      <h2>Knockout Stage</h2>
      <p>The Bracket will be populated automatically once the Group Stage concludes (${playedMatches}/${totalMatches} matches played).</p>
      <div style="margin-top: 2rem; opacity: 0.5;">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      </div>
    `;
  } else {
    container.innerHTML = `
      <h2>Knockout Stage</h2>
      <p style="color: var(--win-color); font-weight: bold;">Group Stage Complete! Bracket generation logic can be implemented here.</p>
    `;
  }
}
