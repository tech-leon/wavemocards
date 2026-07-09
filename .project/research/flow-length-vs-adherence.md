# Flow length vs adherence (Evidence-based emotion-recording flow — Question 1)

Research question (from `roadmaps.md`): The explore flow is ~6–7 steps (cards →
strength → story background → action → complete). What does EMA
(ecological momentary assessment) / mood-tracking-app literature say about
recording burden vs long-term adherence?

Scope note: most EMA literature measures burden as *prompts per day* /
*study duration* (multi-day protocols with repeated signals), not *steps
within a single self-initiated entry* the way our flow works. Findings below
are read through that lens — see Synthesis for how they translate to our
single-entry, multi-step design.

## Papers

### 1. Wrzus & Neubauer (2021) — "Ecological Momentary Assessment: A Meta-Analysis on Designs, Samples, and Compliance Across Research Fields"
- Journal: *Assessment*. https://consensus.app/papers/details/ba205b2dfa595260b83f1cca8c2dd67a/
- Source: Consensus. Evidence level: meta-analysis (k=477 articles, 496 samples, N=677,536).
- Found average EMA study design was 6 assessments/day for 7 days, 79% compliance. Number of assessments per day did **not** predict compliance or dropout; financial incentives were the only design factor that reliably raised compliance.
- Relevance: the strongest single piece of evidence that *raw item/assessment count* is not the primary lever for adherence — cuts against an intuition that "shorter flow = more completions" as a universal rule, though this is measuring cross-study frequency, not within-entry step count.

### 2. Williams, Lewthwaite, Fraysse, Gajewska, Ignatavicius & Ferrar (2019/2021) — "Compliance With Mobile Ecological Momentary Assessment of Self-Reported Health-Related Behaviors and Psychological Constructs in Adults: Systematic Review and Meta-analysis"
- Journal: *Journal of Medical Internet Research*. https://consensus.app/papers/details/24a6c74a171f5f57a844ba8242ac4701/
- Source: Consensus. Evidence level: systematic review + meta-analysis (105 datasets, adults).
- Overall compliance 81.9% (95% CI 79.1–84.4). Compliance was associated with prompts/day and items/prompt only in nonclinical samples; overall "no compelling relationship" was found between protocol burden features and compliance, with high heterogeneity (I²>90%).
- Relevance: reinforces #1 — burden metrics correlate weakly and inconsistently with compliance across the literature. Median items/prompt in this review was 8–10, i.e. comparable in order of magnitude to our ~6–7 step flow.

### 3. Wen, Schneider, Stone & Spruijt-Metz (2017) — "Compliance With Mobile Ecological Momentary Assessment Protocols in Children and Adolescents: A Systematic Review and Meta-Analysis"
- Journal: *Journal of Medical Internet Research*. https://consensus.app/papers/details/7352a42ccb8f52c88bfb8693ae640e72/
- Source: Consensus. Evidence level: systematic review + meta-analysis (42 studies, age ≤18).
- Weighted average compliance 78.3% in youth. Notably counter-intuitive: in clinical youth samples, *higher* prompt frequency (6+/day) had *higher* compliance (89.3%) than lower frequency (2–3/day: 73.5%); in nonclinical youth it was the reverse (2–3/day: 91.7% vs 6+/day: 75%). Duration of the EMA period did not affect compliance in either group.
- Relevance: directly relevant since our user base includes junior-high students. Shows burden/frequency effects are not uniform even within one population — clinical vs nonclinical youth respond oppositely to frequency, so we should be cautious generalising "fewer steps is always better" to teen users without our own funnel data.

### 4. Kraft, et al. (2024) — "Mobile Crowdsensing in Ecological Momentary Assessment mHealth Studies: A Systematic Review and Analysis"
- Journal: *Sensors (Basel)*. https://consensus.app/papers/details/3b34f0ed19bf5cb5892c400590f314a6/
- Source: Consensus. Evidence level: systematic review (PRISMA-guided).
- Found EMA adherence was negatively correlated with total number of prompts (i.e., cumulative burden across a study), and adherence was higher in studies using a microinteraction-based EMA (μEMA) approach (very short, single-tap style entries) and in studies using passive sensors to reduce active input.
- Relevance: supports minimising *active input burden* generally, and is the one paper in this set that points toward "shorter/lighter is better" rather than "burden doesn't matter" — worth weighing against #1/#2, which look at per-day frequency rather than micro-interaction design specifically.

### 5. Torkamaan et al. (2020) — "Mobile Mood Tracking"
- Journal/venue: *Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies (IMWUT)*. https://consensus.app/papers/details/cf5aa917f2155551b8669d439f6358ea/
- Source: Consensus. Evidence level: non-RCT experimental (4 independent samples, longitudinal).
- Tested shortening a mood measure (down to a 2-item measure vs I-PANAS-SF) and an adaptive measure that further reduces question count based on predicted mood fluctuation. Key result: adaptively reducing the number of questions **did not significantly change user compliance**, but did slightly improve usability ratings.
- Relevance: the one study here that experimentally manipulates *item count within a single assessment* (closest analogue to shortening our flow) rather than just observing correlational designs — and still finds no significant compliance effect from shortening, only a usability improvement. Weakens the case that trimming steps alone will move completion rates; it may still be worth doing for usability/goodwill reasons.

### 6. Baumel, Muench, Edan & Kane (2019) — "Objective User Engagement With Mental Health Apps: Systematic Search and Panel-Based Usage Analysis"
- Journal: *Journal of Medical Internet Research*. https://consensus.app/papers/details/d69ca4620c5f5324b9ea16f3a4b9bc33/
- Source: Consensus. Evidence level: observational (93 apps, ≥10,000 installs each, independent panel data).
- Real-world (non-trial) tracker apps had median 30-day retention of just 6.1% (IQR 20.4%), and median daily-active-user rate of 6.3% among trackers. Retention/engagement was far lower than what trial-based EMA compliance studies (75–95%) suggest, because trial participants are recruited/incentivized/monitored differently from organic app users.
- Relevance: important caveat for interpreting papers #1–5: they are almost all EMA *research study* compliance rates (with incentives, researcher contact, fixed short duration), not organic self-directed app usage like WavEmoCards. Our realistic baseline for comparison is closer to this figure and to #7/#8 below, not to 80–90% "compliance."

### 7. Fleming, Bavin, Lucassen, Stasiak, Hopkins & Merry (2018) — "Beyond the Trial: Systematic Review of Real-World Uptake and Engagement With Digital Self-Help Interventions for Depression, Low Mood, or Anxiety"
- Journal: *Journal of Medical Internet Research*. https://consensus.app/papers/details/a7823bdbd84554f29ae01ed83b93c753/
- Source: Consensus. Evidence level: systematic review (10 included studies covering 7 real-world interventions).
- Real-world minimal-use rates ranged 21–88%; sustained/completion use (finishing all modules, or continued use after 6+ weeks) ranged only 0.5–28.6%. Usage data reporting was inconsistent across the field.
- Relevance: corroborates #6 that "used it once" and "used it long-term" are very different bars, and that long-term sustained use is rare across the whole digital-mental-health category regardless of flow design — sets realistic expectations for what our funnel data will likely show.

### 8. Su & Anderson (2021/2022) — "User Behavior of a Publicly Available, Free-to-Use, Self-guided mHealth App for Depression: Observational Study in a Global Sample" (MoodTools)
- Journal: *JMIR Formative Research*. https://consensus.app/papers/details/059feec9193c58829b0b9ce9ae57278d/
- Source: Consensus. Evidence level: observational (158,930 users, Android analytics, 2016–2018).
- 51.14% of users returned after first download; retention decreased with each subsequent session. Typical user: 3 sessions totalling 12 minutes over 90 days. The mood-check tool (PHQ-9, a short structured self-report) and a thought-diary tool (longer free-text) were both heavily used, at similar visit counts, despite very different lengths (PHQ-9 ~49s vs Thought Diary ~3min5s per visit).
- Relevance: concrete real-world numbers for what "typical" organic engagement with a free self-report tool looks like — useful anchor once our own Vercel Analytics + `emotion_records` retention data (per the Usage Instrumentation item) comes online. Also mild evidence that item length alone doesn't gate use: a much longer free-text tool (Thought Diary) was used about as often as the short structured one (PHQ-9).

## Saturation note

Searches ("EMA survey burden adherence compliance," "mental health app engagement/adherence item count," "mood tracking app retention/engagement") converged on the same core set of meta-analyses/systematic reviews (Wrzus 2021, Williams 2019, Wen 2017) being cited as the authoritative burden↔compliance evidence, and the same handful of real-world usage papers (Baumel 2019, Fleming 2018, Su 2021) for engagement baselines. Additional searches were returning individual small feasibility studies (bipolar, grief, MCI populations) that add adherence-rate data points but no new mechanism — stopping here per the 6–8 papers/run budget rather than chasing long-tail feasibility studies.

## Synthesis for our design question

1. **Number of steps/items is a weak predictor of compliance in the EMA literature** (#1, #2), and the one experimental test of shortening a single assessment found no significant compliance change from cutting items (#5). This is fairly consistent evidence *against* the assumption that trimming our ~6–7 step flow, by itself, will meaningfully raise completion rates.
2. There is a partial counter-signal (#4: fewer total daily prompts and micro-interaction design correlate with higher adherence) and adolescent-specific evidence is genuinely mixed and sometimes reversed from adult intuition (#3) — so this should not be read as "flow length doesn't matter at all," especially for our teen users.
3. The much bigger and more consistent finding across the literature is that **organic, real-world use of any self-report/mood app has low long-term retention** regardless of design (#6, #7, #8) — trial-reported 80–90% compliance figures come from incentivized, monitored, short-duration research studies and are not the right comparison for our unincentivized, indefinite-duration app.
4. Practical implication: this literature does not by itself justify shortening the flow. The Usage Instrumentation funnel data (once collected) is what will actually show whether users are dropping off *within* a single explore-flow session (where step count might matter) versus not *returning* over time (where step count is a weak lever per this literature, and other factors — reminders, perceived value, habit formation — dominate). Recommend keeping the current flow shape until funnel data identifies a specific within-session drop-off point.

**Proposed decision (for Leon to confirm) — Question 1 only**: Do not shorten the explore flow speculatively based on this literature alone; the evidence that item/step count drives compliance is weak and inconsistent. Wait for the Usage Instrumentation funnel data (`analytics_route_daily` + route-level pageviews) to identify whether there is an actual within-flow drop-off step before considering flow-length changes. Questions 2 (affect-labelling efficacy) and 3 (journal vs simplified flow) remain pending and may still motivate flow changes on other grounds.
