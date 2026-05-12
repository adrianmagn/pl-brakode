import { useEffect } from "react";

const teams = {
  Arsenal: "#d71920",
  "Aston Villa": "#7a003c",
  Bournemouth: "#d71920",
  Brentford: "#e30613",
  Brighton: "#0057b8",
  Burnley: "#6c1d45",
  Chelsea: "#034694",
  "Crystal Palace": "#1b458f",
  Everton: "#003399",
  Fulham: "#f7f7f7",
  Leeds: "#f5f5f5",
  Liverpool: "#c8102e",
  "Man City": "#6cabdd",
  "Man Utd": "#da291c",
  "Man United": "#da291c",
  Newcastle: "#f5f5f5",
  "Nott'm Forest": "#dd0000",
  "Nottm Forest": "#dd0000",
  Sunderland: "#eb172b",
  Spurs: "#f7f7f7",
  Tottenham: "#f7f7f7",
  "West Ham": "#7a263a",
  "West Ham United": "#7a263a",
  Wolves: "#fdb913"
};

const runningStats = [
  ["Man City", 115.47, 3117.6, 27, 20],
  ["Leeds", 114.75, 3098.2, 27, 19],
  ["Arsenal", 114.28, 3199.9, 28, 18],
  ["Newcastle", 113.98, 3077.4, 27, 17],
  ["Brighton", 113.59, 3066.9, 27, 16],
  ["Burnley", 112.51, 3037.9, 27, 15],
  ["Brentford", 112.47, 3036.8, 27, 14],
  ["Crystal Palace", 111.97, 3023.1, 27, 13],
  ["Fulham", 111.43, 3008.7, 27, 12],
  ["Bournemouth", 110.55, 2984.9, 27, 11],
  ["Sunderland", 110.14, 2973.9, 27, 10],
  ["Man Utd", 109.77, 2963.7, 27, 9],
  ["West Ham", 109.06, 2944.7, 27, 8],
  ["Wolves", 109.02, 3052.6, 28, 7],
  ["Spurs", 108.81, 2937.9, 27, 6],
  ["Aston Villa", 108.76, 2936.6, 27, 5],
  ["Liverpool", 108.57, 2931.5, 27, 4],
  ["Everton", 108.57, 2931.4, 27, 4],
  ["Nott'm Forest", 108.23, 2922.1, 27, 2],
  ["Chelsea", 105.7, 2854.0, 27, 1]
].map(([team, averageKm, totalKm, matches, ledMatches]) => ({
  team,
  averageKm,
  totalKm,
  matches,
  ledMatches
}));

const xgStats = [
  ["Man City", 35, 72, 68.55, 1.96, 3.5],
  ["Arsenal", 36, 68, 67.35, 1.87, 0.7],
  ["Chelsea", 36, 55, 66.85, 1.86, -11.9],
  ["Man Utd", 36, 63, 64.21, 1.78, -1.2],
  ["Bournemouth", 36, 56, 60.31, 1.68, -4.3],
  ["Liverpool", 36, 60, 60.21, 1.67, -0.2],
  ["Leeds", 36, 48, 58.67, 1.63, -10.7],
  ["Newcastle", 36, 50, 57.56, 1.6, -7.6],
  ["Brentford", 36, 52, 55.69, 1.55, -3.7],
  ["Crystal Palace", 35, 38, 55.16, 1.58, -17.2],
  ["Brighton", 36, 52, 53.62, 1.49, -1.6],
  ["Fulham", 36, 44, 50.71, 1.41, -6.7],
  ["Everton", 36, 46, 48.93, 1.36, -2.9],
  ["Aston Villa", 36, 50, 48.61, 1.35, 1.4],
  ["West Ham", 36, 42, 48.48, 1.35, -6.5],
  ["Nott'm Forest", 36, 45, 45.66, 1.27, -0.7],
  ["Spurs", 36, 46, 43.01, 1.19, 3],
  ["Sunderland", 36, 37, 39.01, 1.08, -2],
  ["Burnley", 36, 37, 33.15, 0.92, 3.9],
  ["Wolves", 36, 25, 33.14, 0.92, -8.1]
].map(([team, played, goals, xg, xgPer90, difference]) => ({
  team,
  played,
  goals,
  xg,
  xgPer90,
  difference
}));

const injuryStats = [
  ["Spurs", 516],
  ["Sunderland", 454],
  ["Crystal Palace", 444],
  ["Chelsea", 440],
  ["Brighton", 382],
  ["Man City", 364],
  ["Arsenal", 362],
  ["Burnley", 352],
  ["Liverpool", 297],
  ["Aston Villa", 276],
  ["Brentford", 264],
  ["Leeds", 217],
  ["Newcastle", 213],
  ["Nott'm Forest", 209],
  ["Bournemouth", 200],
  ["Wolves", 192],
  ["Everton", 191],
  ["Man Utd", 165],
  ["West Ham", 163],
  ["Fulham", 147]
].map(([team, days]) => ({ team, days }));

const ppdaLeaders = [
  ["Bournemouth", 9.7],
  ["Arsenal", 9.9],
  ["Brighton", 10.0],
  ["Spurs", 10.6],
  ["Liverpool", 10.8]
].map(([team, ppda]) => ({ team, ppda }));

const xgdStats = [
  ["Arsenal", 32.14],
  ["Man City", 23.65],
  ["Liverpool", 18.66],
  ["Chelsea", 17.5],
  ["Man Utd", 13.19],
  ["Crystal Palace", 6.29],
  ["Newcastle", 4.6],
  ["Bournemouth", 3.61]
].map(([team, xgd]) => ({ team, xgd }));

const xptsSwings = [
  ["Aston Villa", 11.8],
  ["Man City", 9.9],
  ["Sunderland", 9.4],
  ["Man Utd", 7.3],
  ["Wolves", -15.4],
  ["Leeds", -9.9],
  ["Chelsea", -8.4],
  ["Spurs", -7.8]
].map(([team, swing]) => ({ team, swing }));

const matchCounts = Object.fromEntries(xgStats.map((item) => [item.team, item.played]));
const injuryRateStats = injuryStats
  .map((item) => ({
    ...item,
    rate: Number(((item.days / ((matchCounts[item.team] || 36) * 90)) * 1000).toFixed(1))
  }))
  .sort((a, b) => b.rate - a.rate)
  .slice(0, 8);

const finishingSwings = [...xgStats]
  .sort((a, b) => b.difference - a.difference)
  .slice(0, 4)
  .concat([...xgStats].sort((a, b) => a.difference - b.difference).slice(0, 4));

const managerStats = [
  ["Pep Guardiola", "Man City", "2016-07-01"],
  ["Mikel Arteta", "Arsenal", "2019-12-22"],
  ["Marco Silva", "Fulham", "2021-07-01"],
  ["Eddie Howe", "Newcastle", "2021-11-08"],
  ["Unai Emery", "Aston Villa", "2022-11-05"],
  ["Andoni Iraola", "Bournemouth", "2023-07-01"],
  ["Daniel Farke", "Leeds", "2023-07-04"],
  ["Oliver Glasner", "Crystal Palace", "2024-02-20"],
  ["Arne Slot", "Liverpool", "2024-06-01"],
  ["Enzo Maresca", "Chelsea", "2024-06-03"],
  ["Fabian Hurzeler", "Brighton", "2024-06-15"],
  ["Scott Parker", "Burnley", "2024-07-05"],
  ["Regis Le Bris", "Sunderland", "2024-07-01"],
  ["Ruben Amorim", "Man Utd", "2024-11-11"],
  ["Vitor Pereira", "Wolves", "2024-12-19"],
  ["David Moyes", "Everton", "2025-01-11"],
  ["Thomas Frank", "Spurs", "2025-06-12"],
  ["Keith Andrews", "Brentford", "2025-06-27"],
  ["Ange Postecoglou", "Nott'm Forest", "2025-09-09"],
  ["Nuno Espirito Santo", "West Ham", "2025-09-27"]
]
  .map(([manager, club, startDate]) => ({
    manager,
    club,
    startDate,
    days: Math.floor((new Date("2026-05-12") - new Date(startDate)) / 86400000)
  }))
  .sort((a, b) => b.days - a.days);

const sourceLinks = [
  {
    label: "Premier League løpedistanse",
    href: "https://www.premierleague.com/en/news/4599250/which-players-and-teams-have-run-furthest-distances-covered-2025-26-premier-league-season"
  },
  {
    label: "OddAlerts xG",
    href: "https://www.oddalerts.com/xg/premier-league"
  },
  {
    label: "Premier League PPDA-forklaring",
    href: "https://www.premierleague.com/en/news/4250153/passes-per-defensive-action-explained"
  },
  {
    label: "Premier League PPDA snapshot",
    href: "https://www.premierleague.com/en/news/4437518/can-arsenals-defence-break-chelseas-record-and-win-them-the-title"
  },
  {
    label: "Sky Sports skadeoversikt",
    href: "https://www.skysports.com/football/news/11685/13415725/premier-league-injury-table-suspension-tracker-and-fpl-news-club-by-club-updates-ahead-of-latest-matchweek"
  },
  {
    label: "Opta/Sky skade-tabell",
    href: "https://www.givemesport.com/premier-league-teams-ranked-injuries-suffered/"
  },
  {
    label: "Premier League managere",
    href: "https://www.premierleague.com/en/news/4325264"
  }
];

const signalCards = [
  { label: "Subdomene", value: "katt" },
  { label: "Favorittfarge", value: "Gronn" },
  { label: "Signatur", value: "Batliv" }
];

const harborNotes = [
  {
    title: "Rolig kurs",
    body:
      "Nettsiden er bygget med en lun, gronn palett som gir samme ro som en stille havn i kveldssol."
  },
  {
    title: "Personlig preg",
    body:
      "Navnet Ole Christian Slaattene star helt i front, med en identitet som foles mer handlaget enn firmapolert."
  },
  {
    title: "Batinspirert",
    body:
      "Former, tekst og stemning peker mot sjo, kai og de lange sommerdagene man helst bruker i eller ved en bat."
  }
];

const favorites = [
  "Gront lys over vannet",
  "Tredekk, tauverk og blankt skrog",
  "Rolige kveldsturer i skjargarden",
  "Et subdomene med litt personlighet"
];

const journey = [
  {
    stop: "01",
    title: "Katt som adresse",
    body:
      "Subdomenet settes i sentrum som en leken inngang til siden, med nok karakter til at det faktisk blir husket."
  },
  {
    stop: "02",
    title: "Gront som kompass",
    body:
      "Fargevalget styrer hele uttrykket, fra bakgrunn og glassflater til knapper og detaljer."
  },
  {
    stop: "03",
    title: "Bater som drivkraft",
    body:
      "Siden lar batinteressen fa definere stemningen, sa resultatet foles personlig i stedet for tilfeldig."
  }
];

const bragCards = [
  { label: "Brand", value: "Brakode" },
  { label: "Fokus", value: "Nettsider og digitale uttrykk" },
  { label: "Kontakt", value: "drozonen@gmail.com" }
];

const offerCards = [
  {
    title: "Nettsider med identitet",
    body:
      "Vi lager sider som ser gjennomtenkte ut, laster raskt og ikke forsvinner inn i mengden."
  },
  {
    title: "Design som faktisk foles",
    body:
      "Typografi, farger og bevegelse brukes for a gi siden personlighet, ikke bare fylle tomrom."
  },
  {
    title: "Klar kontaktvei",
    body:
      "Nar noen vil ta kontakt, skal det vare enkelt. Derfor ligger e-postflyten tydelig og rett fram."
  }
];

const processSteps = [
  { step: "01", title: "Ide og retning", body: "Vi finner uttrykket, stemningen og hva siden faktisk skal oppna." },
  { step: "02", title: "Design og bygg", body: "Vi former en side som ser skarp ut pa bade mobil og desktop." },
  { step: "03", title: "Lansering og kontakt", body: "Siden blir klar til a deles, med tydelig inngang for nye henvendelser." }
];

const playerStatsSnapshotDate = "12.05.2026";

const topScorers = [
  ["Erling Haaland", "Man City", 22, 2323],
  ["Igor Thiago", "Brentford", 18, 2471],
  ["Antoine Semenyo", "Bournemouth", 15, 2513],
  ["Joao Pedro", "Chelsea", 14, 2143],
  ["Hugo Ekitike", "Liverpool", 11, 1769]
].map(([player, club, goals, minutes]) => ({ player, club, goals, minutes }));

const topAssists = [
  ["Bruno Fernandes", "Man United", 14, 2254],
  ["Rayan Cherki", "Man City", 8, 1276],
  ["Erling Haaland", "Man City", 7, 2323],
  ["Harry Wilson", "Fulham", 6, 2086],
  ["Jack Grealish", "Everton", 6, 1628]
].map(([player, club, assists, minutes]) => ({ player, club, assists, minutes }));

const goalsPer90Leaders = [
  ["Erling Haaland", "Man City", 0.81, 25, 2773],
  ["Eli Junior Kroupi", "Bournemouth", 0.75, 12, 1449],
  ["Igor Thiago", "Brentford", 0.66, 22, 3011],
  ["Benjamin Sesko", "Man United", 0.6, 11, 1643],
  ["Viktor Gyokeres", "Arsenal", 0.6, 14, 2109]
].map(([player, club, goalsPer90, goals, minutes]) => ({
  player,
  club,
  goalsPer90,
  goals,
  minutes
}));

const mostUsedPlayers = [
  ["Bernd Leno", "Fulham", 2790],
  ["David Raya", "Arsenal", 2790],
  ["Jordan Pickford", "Everton", 2790],
  ["Martin Dubravka", "Burnley", 2790],
  ["Virgil van Dijk", "Liverpool", 2790]
].map(([player, club, minutes]) => ({ player, club, minutes }));

const shotsOnTargetLeaders = [
  ["Erling Haaland", "Man City", 53, 2683],
  ["Igor Thiago", "Brentford", 41, 3011],
  ["Antoine Semenyo", "Bournemouth", 38, 2830],
  ["Matheus Cunha", "Man United", 32, 2240],
  ["Benjamin Sesko", "Man United", 32, 1598]
].map(([player, club, shotsOnTarget, minutes]) => ({
  player,
  club,
  shotsOnTarget,
  minutes
}));

const goalContributionsPer90Leaders = [
  ["Erling Haaland", "Man City", 1.04, 32, 2773],
  ["Bruno Fernandes", "Man United", 0.87, 27, 2793],
  ["Rayan Cherki", "Man City", 0.82, 15, 1646],
  ["Hugo Ekitike", "Liverpool", 0.75, 15, 1803],
  ["Eli Junior Kroupi", "Bournemouth", 0.75, 12, 1449]
].map(([player, club, contributionsPer90, contributions, minutes]) => ({
  player,
  club,
  contributionsPer90,
  contributions,
  minutes
}));

const playerStatGroups = [
  {
    id: "scorers",
    kicker: "Spillerstatistikk",
    title: "Toppscorer hittil",
    badge: "Topp 5",
    columns: ["#", "Spiller", "Klubb", "Mål", "Min"],
    rows: topScorers,
    note:
      "Snapshot av toppscorerlisten med spilte minutter ved siden av, så det blir lettere å lese volum mot produksjon.",
    sourceLabel: "Statbunker toppscorer",
    sourceHref: "https://www.statbunker.com/competitions/TopStrikers?comp_id=776",
    renderRow: (item, index) => (
      <tr key={`${item.player}-${item.club}`}>
        <td>{index + 1}</td>
        <td>{item.player}</td>
        <td><TeamBadge team={item.club} /></td>
        <td>{item.goals}</td>
        <td>{item.minutes.toLocaleString("nb-NO")}</td>
      </tr>
    )
  },
  {
    id: "assists",
    kicker: "Spillerstatistikk",
    title: "Flest målgivende",
    badge: "Topp 5",
    columns: ["#", "Spiller", "Klubb", "A", "Min"],
    rows: topAssists,
    note:
      "Ren assist-visning for å få playmakerne fram uten at de drukner i lagtabellene lenger ned.",
    sourceLabel: "StatMuse assists",
    sourceHref: "https://www.statmuse.com/fc/ask/premier-league-player-most-assists-2026-per-min",
    renderRow: (item, index) => (
      <tr key={`${item.player}-${item.club}`}>
        <td>{index + 1}</td>
        <td>{item.player}</td>
        <td><TeamBadge team={item.club} /></td>
        <td>{item.assists}</td>
        <td>{item.minutes.toLocaleString("nb-NO")}</td>
      </tr>
    )
  },
  {
    id: "goals-per-90",
    kicker: "Effektivitet",
    title: "Best mål per 90",
    badge: "Minst 30 min per lagkamp",
    columns: ["#", "Spiller", "Klubb", "G/90", "Mål", "Min"],
    rows: goalsPer90Leaders,
    note:
      "Denne listen viser hvem som faktisk er mest kliniske, ikke bare hvem som har spilt flest minutter og rukket flest avslutninger.",
    sourceLabel: "StatMuse mål per 90",
    sourceHref: "https://www.statmuse.com/fc/ask?q=most+goals+per+90+premier+league+25-26+season",
    renderRow: (item, index) => (
      <tr key={`${item.player}-${item.club}`}>
        <td>{index + 1}</td>
        <td>{item.player}</td>
        <td><TeamBadge team={item.club} /></td>
        <td>{item.goalsPer90.toFixed(2)}</td>
        <td>{item.goals}</td>
        <td>{item.minutes.toLocaleString("nb-NO")}</td>
      </tr>
    )
  },
  {
    id: "minutes",
    kicker: "Belastning",
    title: "Mest brukte spillere",
    badge: "Minutter",
    columns: ["#", "Spiller", "Klubb", "Min"],
    rows: mostUsedPlayers,
    note:
      "En enkel slitestyrke-liste som viser hvem som nesten aldri tas av og i praksis bærer kampene uke etter uke.",
    sourceLabel: "StatMuse minutter",
    sourceHref: "https://www.statmuse.com/fc/ask/most-minutes-played-in-premier-league",
    renderRow: (item, index) => (
      <tr key={`${item.player}-${item.club}`}>
        <td>{index + 1}</td>
        <td>{item.player}</td>
        <td><TeamBadge team={item.club} /></td>
        <td>{item.minutes.toLocaleString("nb-NO")}</td>
      </tr>
    )
  },
  {
    id: "shots-on-target",
    kicker: "Volum",
    title: "Flest skudd på mål",
    badge: "Topp 5",
    columns: ["#", "Spiller", "Klubb", "SOT", "Min"],
    rows: shotsOnTargetLeaders,
    note:
      "Skudd på mål fungerer fint som en rask proxy for hvor mye trussel en spiller faktisk skaper, selv når målene ikke tikker inn.",
    sourceLabel: "StatMuse skudd på mål",
    sourceHref: "https://www.statmuse.com/fc/ask?q=most+shots+on+target+per+player+premier+league+2025%2F2026",
    renderRow: (item, index) => (
      <tr key={`${item.player}-${item.club}`}>
        <td>{index + 1}</td>
        <td>{item.player}</td>
        <td><TeamBadge team={item.club} /></td>
        <td>{item.shotsOnTarget}</td>
        <td>{item.minutes.toLocaleString("nb-NO")}</td>
      </tr>
    )
  },
  {
    id: "goal-contributions-per-90",
    kicker: "Produksjon",
    title: "Målbidrag per 90",
    badge: "Mål + assist",
    columns: ["#", "Spiller", "Klubb", "G+A/90", "G+A", "Min"],
    rows: goalContributionsPer90Leaders,
    note:
      "Kombinerer scoring og tilrettelegging i ett tall. Dette er ofte den beste raske listen for hvem som skaper mest sluttprodukt akkurat nå.",
    sourceLabel: "StatMuse målbidrag per 90",
    sourceHref: "https://www.statmuse.com/fc/ask?l=pl&q=most+goal+contributions+per+90+in+2025-26",
    renderRow: (item, index) => (
      <tr key={`${item.player}-${item.club}`}>
        <td>{index + 1}</td>
        <td>{item.player}</td>
        <td><TeamBadge team={item.club} /></td>
        <td>{item.contributionsPer90.toFixed(2)}</td>
        <td>{item.contributions}</td>
        <td>{item.minutes.toLocaleString("nb-NO")}</td>
      </tr>
    )
  }
];

const contactSubject = encodeURIComponent("Kontakt fra brakode.dev");
const contactBody = encodeURIComponent(
  "Hei Brakode,%0D%0A%0D%0AJeg vil gjerne ta kontakt om en nettside.%0D%0A%0D%0AMvh"
);
const contactHref = `mailto:drozonen@gmail.com?subject=${contactSubject}&body=${contactBody}`;

function usePageMeta({ title, description, image, url }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", value);
      }
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image);
  }, [description, image, title, url]);
}

function TeamBadge({ team }) {
  return (
    <span className="team-name">
      <span className="team-dot" style={{ "--team": teams[team] || "#94a3b8" }} />
      {team}
    </span>
  );
}

function MetricList({ rows, valueKey, suffix = "", inverse = false }) {
  const absoluteMax = Math.max(...rows.map((item) => Math.abs(item[valueKey])));

  return (
    <div className="metric-list">
      {rows.map((item) => {
        const value = item[valueKey];
        const positive = inverse ? value < 0 : value >= 0;
        return (
          <div className="metric-row" key={`${item.team}-${valueKey}-${value}`}>
            <TeamBadge team={item.team} />
            <div className="metric-track">
              <i
                className={positive ? "metric-positive" : "metric-negative"}
                style={{ width: `${Math.max((Math.abs(value) / absoluteMax) * 100, 8)}%` }}
              />
            </div>
            <strong className={positive ? "positive" : "negative"}>
              {value > 0 ? "+" : ""}
              {value}
              {suffix}
            </strong>
          </div>
        );
      })}
    </div>
  );
}

function StatTable({ columns, rows, renderRow }) {
  return (
    <div className="pl-table-wrap">
      <table className="pl-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  );
}

function PlayerStatCard({ stat }) {
  return (
    <article className="pl-panel">
      <div className="pl-section-head">
        <div>
          <p className="pl-kicker">{stat.kicker}</p>
          <h2>{stat.title}</h2>
        </div>
        <span>{stat.badge}</span>
      </div>
      <StatTable columns={stat.columns} rows={stat.rows} renderRow={stat.renderRow} />
      <p className="pl-helper">{stat.note}</p>
      <p className="pl-source-note">
        Snapshot {playerStatsSnapshotDate} fra{" "}
        <a href={stat.sourceHref} target="_blank" rel="noreferrer">
          {stat.sourceLabel}
        </a>
        .
      </p>
    </article>
  );
}

function PlApp() {
  usePageMeta({
    title: "Statistikk PL 25/26",
    description:
      "Premier League 2025/26-statistikk for spillerproduksjon, løpsdistanse, xG, skadebelastning og managerdager.",
    image: "https://brakode.dev/brakode-og.png",
    url: "https://pl.brakode.dev/"
  });

  const topRunner = runningStats[0];
  const topXg = xgStats[0];
  const topInjury = injuryStats[0];
  const longestManager = managerStats[0];
  const maxInjuryDays = Math.max(...injuryStats.map((item) => item.days));
  const goalLeader = topScorers[0];
  const assistLeader = topAssists[0];
  const efficiencyLeader = goalsPer90Leaders[0];
  const minutesLeader = mostUsedPlayers[0];

  return (
    <main className="pl-page">
      <section className="pl-hero">
        <div className="pl-hero-copy">
          <p className="pl-kicker">pl.brakode.dev</p>
          <h1>Statistikk PL 25/26</h1>
          <p>
            En mørk, tabelltung Premier League-flate for spillerproduksjon,
            løping, xG, skader og managerslitasje. Tallene er strukturert slik
            at de kan byttes til en automatisk scrape-feed senere.
          </p>
        </div>

        <div className="pl-scoreboard" aria-label="Nøkkeltall">
          <article>
            <span>Toppscorer</span>
            <strong>{goalLeader.player}</strong>
            <small>{goalLeader.goals} mål</small>
          </article>
          <article>
            <span>Flest assists</span>
            <strong>{assistLeader.player}</strong>
            <small>{assistLeader.assists} målgivende</small>
          </article>
          <article>
            <span>Best mål per 90</span>
            <strong>{efficiencyLeader.player}</strong>
            <small>{efficiencyLeader.goalsPer90.toFixed(2)} G/90</small>
          </article>
          <article>
            <span>Flest minutter</span>
            <strong>{minutesLeader.player}</strong>
            <small>{minutesLeader.minutes.toLocaleString("nb-NO")} min</small>
          </article>
        </div>
      </section>

      <section className="pl-player-grid">
        {playerStatGroups.map((stat) => (
          <PlayerStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="pl-grid">
        <article className="pl-panel pl-panel-wide">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Tracking</p>
              <h2>Løpsdistanse per lag</h2>
            </div>
            <span>MW27/28</span>
          </div>
          <StatTable
            columns={["#", "Lag", "Snitt km", "Total km", "Kamper", "Løpt lengst"]}
            rows={runningStats}
            renderRow={(item, index) => (
              <tr key={item.team}>
                <td>{index + 1}</td>
                <td><TeamBadge team={item.team} /></td>
                <td>{item.averageKm.toFixed(2)}</td>
                <td>{item.totalKm.toLocaleString("nb-NO")}</td>
                <td>{item.matches}</td>
                <td>{item.ledMatches}</td>
              </tr>
            )}
          />
          <p className="pl-helper">
            Snitt km viser hvor langt laget dekker per kamp. “Løpt lengst”
            viser antall runder der laget topper den aktuelle løpsrangeringen.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Skader</p>
              <h2>Dager ute</h2>
            </div>
            <span>Sesong</span>
          </div>
          <div className="injury-chart">
            {injuryStats.map((item) => (
              <div className="injury-row" key={item.team}>
                <span>{item.team}</span>
                <div>
                  <i style={{ width: `${(item.days / maxInjuryDays) * 100}%`, background: teams[item.team] }} />
                </div>
                <strong>{item.days}</strong>
              </div>
            ))}
          </div>
          <p className="pl-helper">
            Summerte dager spillere har vært ute med skade gjennom sesongen.
            Høyere tall betyr større samlet fraværsbelastning.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Press</p>
              <h2>PPDA: mest aggressiv</h2>
            </div>
            <span>Lavere = hardere</span>
          </div>
          <StatTable
            columns={["#", "Lag", "PPDA"]}
            rows={ppdaLeaders}
            renderRow={(item, index) => (
              <tr key={item.team}>
                <td>{index + 1}</td>
                <td><TeamBadge team={item.team} /></td>
                <td>{item.ppda.toFixed(1)}</td>
              </tr>
            )}
          />
          <p className="pl-helper">
            PPDA betyr “passes per defensive action”. Lavere PPDA peker mot
            mer aggressivt press fordi motstanderen rekker færre pasninger før
            laget griper inn.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Underlying styrke</p>
              <h2>xG-differanse</h2>
            </div>
            <span>xG - xGA</span>
          </div>
          <MetricList rows={xgdStats} valueKey="xgd" />
          <p className="pl-helper">
            xG-differanse er `xG - xGA`: forventede mål skapt minus forventede
            mål sluppet til. Positiv verdi tyder på bedre underliggende balanse.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Tabell mot modell</p>
              <h2>Poeng minus xPTS</h2>
            </div>
            <span>Over / under</span>
          </div>
          <MetricList rows={xptsSwings} valueKey="swing" />
          <p className="pl-helper">
            Poeng minus xPTS viser faktisk poengfangst mot forventede poeng.
            Positiv verdi betyr at laget har tatt mer enn modellen tilsier.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Skadebelastning</p>
              <h2>Skadedager per 1000 lagminutter</h2>
            </div>
            <span>Normalisert</span>
          </div>
          <MetricList rows={injuryRateStats} valueKey="rate" suffix="" />
          <p className="pl-helper">
            Samme skadebelastning som over, men normalisert per 1000
            lagminutter. Det gjør lag med ulikt kampantall lettere å sammenligne.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Avslutning</p>
              <h2>Mål minus xG</h2>
            </div>
            <span>Klinisk / sløsete</span>
          </div>
          <MetricList rows={finishingSwings} valueKey="difference" />
          <p className="pl-helper">
            Mål minus xG måler avslutningseffektivitet. Positiv verdi betyr at
            laget scorer mer enn sjansekvaliteten tilsier.
          </p>
        </article>

        <article className="pl-panel pl-panel-wide">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Expected Goals</p>
              <h2>xG-tabell</h2>
            </div>
            <span>36 runder ca.</span>
          </div>
          <StatTable
            columns={["#", "Lag", "K", "Mål", "xG", "xG/90", "+/-"]}
            rows={xgStats}
            renderRow={(item, index) => (
              <tr key={item.team}>
                <td>{index + 1}</td>
                <td><TeamBadge team={item.team} /></td>
                <td>{item.played}</td>
                <td>{item.goals}</td>
                <td>{item.xg.toFixed(2)}</td>
                <td>{item.xgPer90.toFixed(2)}</td>
                <td className={item.difference >= 0 ? "positive" : "negative"}>
                  {item.difference > 0 ? "+" : ""}{item.difference}
                </td>
              </tr>
            )}
          />
          <p className="pl-helper">
            xG-tabellen rangerer lag etter forventede mål. Kolonnen `+/-`
            viser faktiske mål minus xG.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Fordeling</p>
              <h2>xG-andel topp 6</h2>
            </div>
          </div>
          <div className="donut" aria-label="xG-andel for topp seks lag">
            {xgStats.slice(0, 6).map((item) => (
              <div className="donut-label" key={item.team}>
                <TeamBadge team={item.team} />
                <strong>{item.xg.toFixed(1)}</strong>
              </div>
            ))}
          </div>
          <p className="pl-helper">
            Viser hvor mye av topp seks-lagenes samlede xG som bæres av hvert
            lag i utvalget.
          </p>
        </article>

        <article className="pl-panel pl-panel-wide">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Managers</p>
              <h2>Dager i klubben</h2>
            </div>
            <span>Per 12.05.2026</span>
          </div>
          <StatTable
            columns={["#", "Manager", "Klubb", "Startdato", "Dager"]}
            rows={managerStats}
            renderRow={(item, index) => (
              <tr key={`${item.manager}-${item.club}`}>
                <td>{index + 1}</td>
                <td>{item.manager}</td>
                <td><TeamBadge team={item.club} /></td>
                <td>{new Date(item.startDate).toLocaleDateString("nb-NO")}</td>
                <td>{item.days.toLocaleString("nb-NO")}</td>
              </tr>
            )}
          />
          <p className="pl-helper">
            Dager i klubben regnes fra tiltredelsesdato til 12. mai 2026, og
            tabellen er sortert fra lengst til kortest ansiennitet.
          </p>
        </article>

        <article className="pl-panel">
          <div className="pl-section-head">
            <div>
              <p className="pl-kicker">Kilder</p>
              <h2>Scrape-status</h2>
            </div>
          </div>
          <ul className="source-list">
            {sourceLinks.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="pl-helper">
            Kildene underbygger løpsdata, xG-familien, skadeoversikten,
            pressing-snapshoten, managerlisten og spilleroversiktene.
          </p>
          <p className="pl-note">
            xG kan hentes direkte fra tabell. Løpssnitt finnes offentlig i PLs
            tracking-artikkel. Skadedager ligger hos Sky/Datawrapper, mens
            “løpt lengst”-kolonnen bør kobles mot kamp-for-kamp tracking når vi
            får en stabil feed. Skadedager er full offentlig Opta/Sky-snapshot;
            nyere rapporter har fortsatt Spurs øverst. xGD, xPTS-gap og mål mot
            xG fungerer fint uten backend som periodiske snapshots. PPDA er den
            klareste kandidaten for en liten backend/cron-feed hvis vi vil holde
            den automatisk fersk og komplett. Spillerlistene er lagt inn som et
            snapshot med tall fra StatMuse og Statbunker, og per-90-listene
            bruker terskel på minst 30 minutter per lagkamp.
          </p>
        </article>
      </section>
    </main>
  );
}

function BrakodeApp() {
  usePageMeta({
    title: "Brakode | Kreative nettsider",
    description:
      "Brakode lager gjennomforte nettsider med tydelig identitet, sterk visuell retning og enkel kontaktflyt.",
    image: "https://brakode.dev/brakode-og.png",
    url: "https://brakode.dev/"
  });

  return (
    <main className="brakode-page">
      <section className="brakode-hero">
        <div className="brakode-hero-copy">
          <div className="brakode-mark">
            <img src="/favicon.svg" alt="Brakode-logo" />
            <span>Brakode</span>
          </div>

          <p className="eyebrow">Digital identitet med litt mer trøkk</p>
          <h1>Generelle nettsider trenger ikke se generiske ut.</h1>
          <p className="brakode-summary">
            Brakode lager nette opplevelser med tydelig personlighet, skarp
            presentasjon og en kontaktflyt som faktisk far folk til a ta kontakt.
          </p>

          <div className="brakode-actions">
            <a className="brakode-primary" href="#kontakt">
              Kontakt oss her
            </a>
            <a className="brakode-secondary" href="#arbeid">
              Se hva vi bygger
            </a>
          </div>

          <div className="brakode-signal-grid">
            {bragCards.map((item) => (
              <article className="brakode-signal-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="brakode-hero-art" aria-hidden="true">
          <div className="art-orbit art-orbit-large" />
          <div className="art-orbit art-orbit-small" />
          <div className="art-core">
            <img src="/favicon.svg" alt="" />
          </div>
          <div className="art-card art-card-top">Merkevare</div>
          <div className="art-card art-card-mid">Nettsider</div>
          <div className="art-card art-card-bottom">Kontakt</div>
        </div>
      </section>

      <section className="brakode-offers" id="arbeid">
        {offerCards.map((item) => (
          <article className="brakode-offer-card" key={item.title}>
            <p className="eyebrow">Brakode</p>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="brakode-lower">
        <article className="brakode-panel brakode-panel-accent">
          <p className="eyebrow">Prosess</p>
          <h2>Fra ide til publisert side</h2>
          <div className="brakode-process-list">
            {processSteps.map((item) => (
              <article className="brakode-process-item" key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="brakode-panel brakode-contact-panel" id="kontakt">
          <p className="eyebrow">Kontakt</p>
          <h2>Kontakt oss her</h2>
          <p className="brakode-contact-text">
            Nar du trykker under, opprettes en e-post til `drozonen@gmail.com`
            med emnet klart. Enkelt, tydelig og klart for nye prosjekter.
          </p>
          <a className="brakode-mail-link" href={contactHref}>
            Send kontakt til drozonen@gmail.com
          </a>
          <p className="brakode-contact-note">E-post: drozonen@gmail.com</p>
        </article>
      </section>
    </main>
  );
}

function OleSite() {
  usePageMeta({
    title: "Ole Christian Slaattene | katt.brakode.dev",
    description:
      "Personlig nettside for Ole Christian Slaattene med gronn signatur og batinspirert uttrykk.",
    image: "https://brakode.dev/brakode-og.png",
    url: "https://katt.brakode.dev/"
  });

  return (
    <main className="site-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">katt.brakode.dev</p>
          <h1>Ole Christian Slaattene</h1>
          <p className="hero-text">
            En personlig nettside med gronn signatur, maritim ro og et lite glimt
            i oyet. Laget for en som elsker bater og vil ha noe med mer sjel enn en
            standard profilside.
          </p>

          <div className="cta-row">
            <a className="primary-link" href="#havna">
              Se uttrykket
            </a>
            <a className="secondary-link" href="#favoritter">
              Detaljer
            </a>
          </div>

          <div className="signal-grid">
            {signalCards.map((item) => (
              <article className="signal-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="sun-disc" />
          <div className="wave wave-back" />
          <div className="boat-card">
            <div className="boat-sail" />
            <div className="boat-mast" />
            <div className="boat-hull" />
          </div>
          <div className="wave wave-front" />
        </div>
      </section>

      <section className="notes-grid" id="havna">
        {harborNotes.map((item) => (
          <article className="note-card" key={item.title}>
            <p className="eyebrow">Havna</p>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="split-section" id="favoritter">
        <article className="panel panel-accent">
          <p className="eyebrow">Favoritter</p>
          <h2>Det som setter tonen</h2>
          <div className="favorite-list">
            {favorites.map((item) => (
              <div className="favorite-pill" key={item}>
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Kurs</p>
          <h2>Tre enkle signaler</h2>
          <div className="journey-list">
            {journey.map((item) => (
              <article className="journey-item" key={item.stop}>
                <span>{item.stop}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function MagnusApp() {
  useEffect(() => {
    document.title = "Magnus | magnus.brakode.dev";
  }, []);

  return (
    <main className="magnus-page">
      <div className="magnus-stage" aria-hidden="true">
        <img className="magnus-floater" src="/magnus.jpg" alt="Magnus" />
      </div>
      <div className="magnus-caption">
        <p>magnus.brakode.dev</p>
      </div>
    </main>
  );
}

export default function App() {
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

  const preview = params?.get("preview");
  const isLocalPreview =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0";
  const isMagnus =
    host === "magnus.brakode.dev" ||
    host.startsWith("magnus.") ||
    preview === "magnus";
  const isKatt =
    host === "katt.brakode.dev" ||
    host.startsWith("katt.") ||
    preview === "katt";
  const isPl =
    host === "pl.brakode.dev" ||
    host.startsWith("pl.") ||
    preview === "pl" ||
    (isLocalPreview && !preview);

  if (isMagnus) {
    return <MagnusApp />;
  }

  if (isKatt) {
    return <OleSite />;
  }

  if (isPl) {
    return <PlApp />;
  }

  return <BrakodeApp />;
}
