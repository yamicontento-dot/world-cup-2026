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

// STRICTLY POPULATED SCORES UP TO JUNE 19
const realScores = {
  // June 11
  "MEX-RSA": [2, 0],
  "KOR-CZE": [2, 1],

  // June 12
  "CAN-BIH": [1, 1],
  "USA-PAR": [4, 1],

  // June 13
  "QAT-SUI": [1, 1],
  "BRA-MAR": [1, 1],
  "HAI-SCO": [0, 1],
  "AUS-TUR": [2, 0],
  "GER-CUW": [7, 1],
  "CIV-ECU": [1, 2],
  "NED-JPN": [2, 2],
  "TUN-SWE": [0, 1],

  // June 14
  "BEL-EGY": [2, 1],
  "IRN-NZL": [0, 0],
  "ESP-CPV": [3, 0],
  "KSA-URU": [0, 2],

  // June 15
  "FRA-SEN": [2, 1],
  "NOR-IRQ": [1, 0],
  "ARG-ALG": [2, 0],
  "AUT-JOR": [3, 1],

  // June 16
  "MEX-KOR": [2, 0], // Mexico qualified
  "RSA-CZE": [1, 1],
  "CAN-QAT": [2, 1],
  "SUI-BIH": [1, 0],
  "POR-UZB": [3, 0],
  "COL-COD": [2, 0],
  "ENG-CRO": [1, 1],
  "GHA-PAN": [2, 1],

  // June 17
  "BRA-SCO": [3, 1],
  "MAR-HAI": [2, 0],
  "USA-AUS": [1, 1],

  // June 18
  "GER-CIV": [2, 1],
  "CUW-ECU": [0, 3],
  "NED-TUN": [3, 0],
  "JPN-SWE": [1, 1],

  // June 19
  "TUR-PAR": [0, 1], // Paraguay passed, Turkey eliminated
  "BEL-IRN": [1, 0],
  "EGY-NZL": [2, 0],
  "ESP-KSA": [4, 0],
  "CPV-URU": [0, 1]
};

const generateMatches = () => {
  const matches = [];
  let matchId = 1;
  const startDate = new Date('2026-06-11T12:00:00Z');

  baseGroups.forEach((group, gIndex) => {
    // Generate all 6 possible matchups for the group manually to avoid missing any pair
    const pairings = [
      [group.teams[0], group.teams[1]], // t1 vs t2
      [group.teams[2], group.teams[3]], // t3 vs t4
      [group.teams[0], group.teams[2]], // t1 vs t3
      [group.teams[1], group.teams[3]], // t2 vs t4
      [group.teams[0], group.teams[3]], // t1 vs t4
      [group.teams[1], group.teams[2]]  // t2 vs t3
    ];
    
    // Base day offset per group to spread out the schedule
    const groupOffset = Math.floor(gIndex / 2); 

    const getScore = (teamA, teamB) => {
      const key1 = `${teamA.id}-${teamB.id}`;
      const key2 = `${teamB.id}-${teamA.id}`;
      if (realScores[key1]) return { s1: realScores[key1][0], s2: realScores[key1][1] };
      if (realScores[key2]) return { s1: realScores[key2][1], s2: realScores[key2][0] };
      return { s1: null, s2: null };
    };

    pairings.forEach((pair, index) => {
      let d = new Date(startDate);
      // Rough mapping to Round 1, 2, 3
      if (index < 2) d.setDate(d.getDate() + groupOffset); // Match 1 & 2
      else if (index < 4) d.setDate(d.getDate() + groupOffset + 5); // Match 3 & 4
      else d.setDate(d.getDate() + groupOffset + 10); // Match 5 & 6

      let score = getScore(pair[0], pair[1]);
      matches.push({
        id: matchId++,
        groupId: group.name,
        team1: pair[0],
        team2: pair[1],
        date: d.toISOString(),
        score1: score.s1,
        score2: score.s2
      });
    });
  });

  return matches;
};

export const worldCupData = {
  groups: baseGroups.map(g => ({
    name: g.name,
    teams: g.teams.map(t => ({
      ...t,
      points: 0, goalsFor: 0, goalsAgainst: 0, played: 0, won: 0, drawn: 0, lost: 0, status: 'dispute'
    }))
  })),
  matches: generateMatches()
};
