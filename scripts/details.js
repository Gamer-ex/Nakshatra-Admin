const nameMap = {
  NK001: "Lab Hunt",
  NK002: "Circuit Manic",
  NK003: "Chemcar",
  NK004: "Chembrane",
  NK005: "Mad Chemistry",
  NK006: "Speed Typing",
  NK007: "Smash the Bug!",
  NK008: "Robo Soccer",
  NK009: "All terrain vehicle race",
  NK010: "Break The Circuit",
  NK011: "Electrohunt",
  NK012: "Tangy Tongues",
  NK013: "Food Fraud",
  NK024: "Line Follower Maze",
  NK015: "RC Racing",
  NK016: "Kickering",
  NK017: "Mechmaniac",
  NK018: "BLUEPRINT",
  NK019: "Cad Clash",
  NK031: "Xperia",
  NK061: "Ganitha Netra",
  NK020: "Gromatici",
  NK021: "LIMIT BREAKERS-MATHS QUIZ",
  NK023: "BlockChain Workshop",
  NK014: "Dart",

  NK025: "MR and MS Nakshatra",
  NK026: "Man of Steel",
  NK027: "Scene de crime",
  NK028: "Titan actor",
  NK029: "Treasure Pursuit",
  NK030: "JAM (Mal and Eng.)",
  NK032: "The Laughter Cruise",
  NK033: "Haute Couture",

  NK034: "Sync step",
  NK035: "Duo dance",
  NK036: "Double trouble",

  NK037: "Voice of Nakshatra",
  NK038: "Nirvana Nation",
  NK039: "Strings Unplugged",

  NK040: "5x5 basketball",
  NK041: "County cricket",
  NK042: "Racquettes Slip Men",
  NK043: "soccer /3x3 football",

  NK044: "Strike’em down",
  NK045: "Queens Gambit - Chess",

  NK046: "Kaptured'23",
  NK047: "Reelistic Delights",
  NK048: "Panoramic",
  NK049: "Reelagram",
  NK050: "Pixelate",

  NK051: "FIFA'23",
  NK052: "Valorant",
  NK053: "E Football’23(PES)",
  NK054: "VR Gaming",
  NK055: "CALL OF DUTY",

  NK056: "Pencil Mania",
  NK057: "Neo Grafitti",
  NK058: "Art A Holic",
  NK059: "ARTLE",

  NK060: "Quizadry",
  NK062: "IPL Auction",

  NK063: "Gourmet Battle",
  NK064: "Blind taste test",

  NK065: "Cinephilia",
  NK066: "Dumb Charades",
  NK067: "Film Trifles",
  NK068: "Make the cut",
  NK069: "Animezing",
  NK070: "Raquettes Slip Women",
};

const temp = [
  "NK014",
  "NK024",
  "NK001",
  "NK002",
  "NK003",
  "NK004",
  "NK065",
  "NK005",
  "NK006",
  "NK007",
  "NK008",
  "NK009",
  "NK031",
  "NK066",
  "NK010",
  "NK011",
  "NK012",
  "NK013",
  "NK015",
  "NK016",
  "NK067",
  "NK017",
  "NK018",
  "NK019",
  "NK020",
  "NK033",
  "NK030",
  "NK055",
  "NK025",
  "NK026",
  "NK027",
  "NK028",
  "NK029",
  "NK032",
  "NK069",
  "NK034",
  "NK035",
  "NK036",
  "NK037",
  "NK057",
  "NK058",
  "NK048",
  "NK040",
  "NK041",
  "NK043",
  "NK056",
  "NK059",
  "NK051",
  "NK054",
  "NK060",
  "NK062",
  "NK044",
  "NK045",
  "NK063",
  "NK064",
];

temp.map((t, i) => {
  console.log(`${t}::${nameMap[t]}`);
});

/*

"NK001"::Lab Hunt
"NK024"::Line Follower Maze
"NK002"::Circuit Manic
"NK003"::Chemcar                  
"NK004"::Chembrane
"NK005"::Mad Chemistry
["NK001","NK024","NK002","NK003","NK004","NK005"],


"NK006"::Speed Typing
"NK007"::Smash the Bug!
"NK031"::Xperia
"NK010"::Break The Circuit                
"NK011"::Electrohunt
["NK006","NK007","NK031","NK010","NK011"],


"NK008"::Robo Soccer
"NK009"::All terrain vehicle race
"NK015"::RC Racing
"NK016"::Kickering
"NK018"::BLUEPRINT
"NK019"::Cad Clash
["NK008","NK009","NK015","NK016","NK018","NK019"],


"NK012"::Tangy Tongues
"NK063"::Gourmet Battle
"NK064"::Blind taste test
"NK013"::Food Fraud
"NK017"::Mechmaniac
"NK020"::Gromatici
["NK012","NK063","NK064","NK013","NK017","NK020"],


"NK027"::Scene de crime
"NK025"::MR and MS Nakshatra
"NK037"::Voice of Nakshatra
"NK029"::Treasure Pursuit
"NK033"::Haute Couture
"NK030"::JAM (Mal and Eng.)
"NK026"::Man of Steel
["NK027","NK025","NK037","NK029","NK033","NK030","NK026"],


"NK034"::Sync step
"NK035"::Duo dance
"NK036"::Double trouble
"NK040"::5x5 basketball
"NK041"::County cricket
"NK043"::soccer /3x3 football
["NK034","NK035","NK036","NK040","NK041","NK043"],


"NK056"::Pencil Mania
"NK059"::ARTLE
"NK057"::Neo Grafitti
"NK058"::Art A Holic
"NK048"::Panoramic
["NK056","NK059","NK057","NK058","NK048"],

"NK051"::FIFA'23
"NK054"::VR Gaming
"NK055"::CALL OF DUTY
"NK060"::Quizadry
"NK062"::IPL Auction
"NK044"::Strike’em down
"NK045"::Queens Gambit - Chess
["NK051","NK054","NK055","NK060","NK062","NK045"]


"NK032"::The Laughter Cruise
"NK069"::Animezing
"NK066"::Dumb Charades
"NK028"::Titan actor
"NK065"::Cinephilia
"NK067"::Film Trifles
["NK032","NK069","NK066","NK028","NK065","NK067"]
*/
