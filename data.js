// data.js

const baseGroups = [
  {
    name: "Group A",
    teams: [
      { id: "MEX", name: "Mexico", flag: "🇲🇽" },
      { id: "RSA", name: "South Africa", flag: "🇿🇦" },
      { id: "KOR", name: "South Korea", flag: "🇰🇷" },
      { id: "CZE", name: "Czechia", flag: "🇨🇿" },
    ]
  },
  {
    name: "Group B",
    teams: [
      { id: "CAN", name: "Canada", flag: "🇨🇦" },
      { id: "QAT", name: "Qatar", flag: "🇶🇦" },
      { id: "SUI", name: "Switzerland", flag: "🇨🇭" },
      { id: "BIH", name: "Bosnia and Herz.", flag: "🇧🇦" },
    ]
  },
  {
    name: "Group C",
    teams: [
      { id: "BRA", name: "Brazil", flag: "🇧🇷" },
      { id: "MAR", name: "Morocco", flag: "🇲🇦" },
      { id: "HAI", name: "Haiti", flag: "🇭🇹" },
      { id: "SCO", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    ]
  },
  {
    name: "Group D",
    teams: [
      { id: "USA", name: "USA", flag: "🇺🇸" },
      { id: "PAR", name: "Paraguay", flag: "🇵🇾" },
      { id: "AUS", name: "Australia", flag: "🇦🇺" },
      { id: "TUR", name: "Türkiye", flag: "🇹🇷" },
    ]
  },
  {
    name: "Group E",
    teams: [
      { id: "GER", name: "Germany", flag: "🇩🇪" },
      { id: "CUW", name: "Curaçao", flag: "🇨🇼" },
      { id: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮" },
      { id: "ECU", name: "Ecuador", flag: "🇪🇨" },
    ]
  },
  {
    name: "Group F",
    teams: [
      { id: "NED", name: "Netherlands", flag: "🇳🇱" },
      { id: "JPN", name: "Japan", flag: "🇯🇵" },
      { id: "TUN", name: "Tunisia", flag: "🇹🇳" },
      { id: "SWE", name: "Sweden", flag: "🇸🇪" },
    ]
  },
  {
    name: "Group G",
    teams: [
      { id: "BEL", name: "Belgium", flag: "🇧🇪" },
      { id: "EGY", name: "Egypt", flag: "🇪🇬" },
      { id: "IRN", name: "Iran", flag: "🇮🇷" },
      { id: "NZL", name: "New Zealand", flag: "🇳🇿" },
    ]
  },
  {
    name: "Group H",
    teams: [
      { id: "ESP", name: "Spain", flag: "🇪🇸" },
      { id: "CPV", name: "Cape Verde", flag: "🇨🇻" },
      { id: "KSA", name: "Saudi Arabia", flag: "🇸🇦" },
      { id: "URU", name: "Uruguay", flag: "🇺🇾" },
    ]
  },
  {
    name: "Group I",
    teams: [
      { id: "FRA", name: "France", flag: "🇫🇷" },
      { id: "SEN", name: "Senegal", flag: "🇸🇳" },
      { id: "NOR", name: "Norway", flag: "🇳🇴" },
      { id: "IRQ", name: "Iraq", flag: "🇮🇶" },
    ]
  },
  {
    name: "Group J",
    teams: [
      { id: "ARG", name: "Argentina", flag: "🇦🇷" },
      { id: "ALG", name: "Algeria", flag: "🇩🇿" },
      { id: "AUT", name: "Austria", flag: "🇦🇹" },
      { id: "JOR", name: "Jordan", flag: "🇯🇴" },
    ]
  },
  {
    name: "Group K",
    teams: [
      { id: "POR", name: "Portugal", flag: "🇵🇹" },
      { id: "UZB", name: "Uzbekistan", flag: "🇺🇿" },
      { id: "COL", name: "Colombia", flag: "🇨🇴" },
      { id: "COD", name: "DR Congo", flag: "🇨🇩" },
    ]
  },
  {
    name: "Group L",
    teams: [
      { id: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { id: "CRO", name: "Croatia", flag: "🇭🇷" },
      { id: "GHA", name: "Ghana", flag: "🇬🇭" },
      { id: "PAN", name: "Panama", flag: "🇵🇦" },
    ]
  }
];

// Helper to generate realistic random scores for matches up to June 19
const getRandomScore = () => Math.floor(Math.random() * 4);

const generateMatches = () => {
  const matches = [];
  let matchId = 1;
  const startDate = new Date('2026-06-11T12:00:00Z');
  const cutoffDate = new Date('2026-06-19T23:59:59Z');

  baseGroups.forEach((group, gIndex) => {
    const [t1, t2, t3, t4] = group.teams;
    
    // Base day offset per group to spread out the schedule
    const groupOffset = Math.floor(gIndex / 2); 

    // Round 1
    let d1 = new Date(startDate);
    d1.setDate(d1.getDate() + groupOffset);
    matches.push({ 
      id: matchId++, groupId: group.name, team1: t1, team2: t2, date: d1.toISOString(), 
      score1: d1 <= cutoffDate ? getRandomScore() : null, 
      score2: d1 <= cutoffDate ? getRandomScore() : null 
    });
    matches.push({ 
      id: matchId++, groupId: group.name, team1: t3, team2: t4, date: d1.toISOString(), 
      score1: d1 <= cutoffDate ? getRandomScore() : null, 
      score2: d1 <= cutoffDate ? getRandomScore() : null 
    });

    // Round 2
    let d2 = new Date(startDate);
    d2.setDate(d2.getDate() + groupOffset + 5);
    matches.push({ 
      id: matchId++, groupId: group.name, team1: t1, team2: t3, date: d2.toISOString(), 
      score1: d2 <= cutoffDate ? getRandomScore() : null, 
      score2: d2 <= cutoffDate ? getRandomScore() : null 
    });
    matches.push({ 
      id: matchId++, groupId: group.name, team1: t2, team2: t4, date: d2.toISOString(), 
      score1: d2 <= cutoffDate ? getRandomScore() : null, 
      score2: d2 <= cutoffDate ? getRandomScore() : null 
    });

    // Round 3
    let d3 = new Date(startDate);
    d3.setDate(d3.getDate() + groupOffset + 10);
    matches.push({ 
      id: matchId++, groupId: group.name, team1: t4, team2: t1, date: d3.toISOString(), 
      score1: d3 <= cutoffDate ? getRandomScore() : null, 
      score2: d3 <= cutoffDate ? getRandomScore() : null 
    });
    matches.push({ 
      id: matchId++, groupId: group.name, team1: t2, team2: t3, date: d3.toISOString(), 
      score1: d3 <= cutoffDate ? getRandomScore() : null, 
      score2: d3 <= cutoffDate ? getRandomScore() : null 
    });
  });

  return matches;
};

export const worldCupData = {
  groups: baseGroups.map(g => ({
    name: g.name,
    teams: g.teams.map(t => ({
      ...t,
      points: 0, goalsFor: 0, goalsAgainst: 0, played: 0, won: 0, drawn: 0, lost: 0
    }))
  })),
  matches: generateMatches()
};
