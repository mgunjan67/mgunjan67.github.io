/* Public sources and explicit user-approved summaries are recorded in public-content.json. */
window.PORTFOLIO_PROJECTS = {
  'spatial-mapping': {
    section:'products',eyebrow:'Spatial intelligence',title:'From drone imagery to spatial understanding.',
    summary:'Connecting a point in a drone photograph with its place in a 3D site.',status:'Computer vision project',
    context:'A photograph is intuitive to inspect. A spatial model provides another kind of context. My work connects these views so people can investigate imagery and understand where an observation belongs.',
    approach:['Explore image-to-model localization and selected-point spatial mapping.','Make spatial relationships inspectable through a browser visualization.','Develop evaluation tools to examine behavior across examples.'],
    role:'Research and engineering across computer vision, spatial reasoning, evaluation tooling, and the operator workflow.',
    boundary:'The visual on this page is an original workflow illustration using an invented site. This short case study describes my contribution at a high level.',boundaryTitle:'About this case study',
    stack:['Computer vision','2D ↔ 3D','Spatial tools'],links:[]
  },
  'visual-progress': {
    section:'products',eyebrow:'Visual progress',title:'A clearer view of what changed.',
    summary:'Making images captured over time easier to compare, even when the viewpoint changes.',status:'Computer vision project',
    context:'Construction imagery carries a useful story over time. Viewpoint changes can make that story harder to read. I developed alignment workflows that bring images toward a common frame for clearer progress comparisons and time-lapse viewing.',
    approach:['Study visual alignment across images captured at different times.','Build workflows that make construction progress easier to inspect.','Review the resulting comparisons for visual continuity.'],
    role:'Research and implementation of image-registration and time-lapse alignment workflows, including demonstrated visual outputs.',
    boundary:'The three stages shown here are original schematic illustrations. They explain the workflow without showing a customer site or internal product interface.',boundaryTitle:'About this case study',
    stack:['Image registration','Visual comparison','Time-lapse'],links:[]
  },
  'visual-review': {
    section:'products',eyebrow:'Visual intelligence',title:'Visual intelligence, with a human in the loop.',
    summary:'Exploring how visual models can help people investigate site imagery in context.',status:'Research exploration · Review prototype',
    context:'Useful visual intelligence needs an inspectable path from an observation to supporting evidence. This exploration focuses on a review workflow in which a person can examine imagery and investigate what a model has highlighted.',
    approach:['Keep visual evidence accessible during review.','Give observations context rather than presenting isolated labels.','Make human investigation part of the workflow.'],
    role:'Research exploration and prototyping of a visual review workflow.',
    boundary:'This note describes an early review prototype. It does not assert an operational safety-alert capability or deployment outcome.',boundaryTitle:'Project stage',
    stack:['Visual review','Human in the loop','Prototyping'],links:[]
  },
  'photo-finisher': {
    section:'photo-finisher',eyebrow:'Independent product / Photo Finisher',title:'Better light. Same place.',
    summary:'A real estate photo-editing workflow that brings exposure balancing and natural finishing into a visual product experience.',status:'Independent product · 25 saved scene results',
    context:'Property photographs need to communicate a space clearly. The project brings together multi-exposure finishing, natural color directions, and visual comparison. This collection covers interiors, gardens, exteriors, and commercial workspaces.',
    approach:['Work from exposure groups to balance interior light and window views.','Explore Bright natural, Soft natural, and Warm natural finishing directions.','Make before-and-after comparison and visual review central to the experience.'],
    role:'Independent product and engineering work across image processing, finishing workflows, and the review experience.',
    boundary:'The 25 gallery scenes are saved project results from 64 source exposures. The feature lab contains three newly generated ImageGen illustrations of proposed features. The 24 style directions are interactive browser color grades for exploration.',boundaryTitle:'What you are exploring',
    stack:['Python','Image processing','Multi-exposure','Visual review'],links:[]
  },
  landslide: {
    section:'research', eyebrow:'Research / Fibre-optic sensing', title:'More sensors. Better evidence?',
    summary:'How should we evaluate landslide monitoring when many sensor measurements describe the same physical event?',
    status:'EGUsphere preprint · 2026',
    context:'The public preprint examines evaluation of distributed acoustic sensing at Hollin Hill and Brienz. Its central question is whether an evaluation respects shared timelines, event definitions, and the available reference observations.',
    approach:['Examine when model fitting and evaluation reuse the same timeline.','Report retrospective alert timing and alert burden separately.','Make the limits of the available event reference explicit.'],
    role:'Co-authored research with Bijaya Ghimire. This note summarizes the publicly posted preprint and links to its public code.',
    boundary:'A retrospective evaluation audit does not establish prediction of future landslides. A preprint is research in progress, not a completed peer-reviewed journal article.',
    stack:['DAS','Evaluation','Signal processing'],
    links:[{label:'Read the preprint',url:'https://egusphere.copernicus.org/preprints/2026/egusphere-2026-4315/'},{label:'Public research code',url:'https://github.com/mgunjan67/das-himalayan-geohazard-ai'}],
    citation:'@article{mishra2026dasAudit,\n  author = {Mishra, Gunjan Kumar and Ghimire, Bijaya},\n  title = {From Sensor-Wise Accuracy to Episode-Wise Evidence: Auditing DAS Slope Monitoring at Hollin Hill and Brienz},\n  journal = {EGUsphere [preprint]},\n  year = {2026},\n  doi = {10.5194/egusphere-2026-4315}\n}'
  },
  runoff: {
    section:'research',eyebrow:'Research / Hydrology & forecasting',title:'Learning the rhythm of Nepal’s rivers.',
    summary:'Exploring attention-based learning for runoff forecasting in Nepal.',
    status:'EarthArXiv preprint · 2025',
    context:'The public study compares a Temporal Fusion Transformer with Random Forest and LSTM models using historical hydrometeorological observations from Nepal.',
    approach:['Compare models that represent temporal patterns in different ways.','Examine runoff forecasting in a setting shaped by monsoon seasonality.','Use the published preprint to inspect the methods, results, and assumptions.'],
    role:'Author of “Attention-Based Deep Learning for Runoff Forecasting: Evaluating the Temporal Fusion Transformer Against Traditional Machine Learning Models.”',
    boundary:'This is a preprint, not a peer-reviewed operational flood-warning system. Research comparisons should be interpreted within their reported data and evaluation setting.',
    stack:['Time series','Temporal Fusion Transformer','Hydrology'],
    links:[{label:'Read the public preprint',url:'https://eartharxiv.org/repository/view/10851/'}],
    citation:'@article{mishra2025runoff,\n  author = {Mishra, Gunjan Kumar},\n  title = {Attention-Based Deep Learning for Runoff Forecasting: Evaluating the Temporal Fusion Transformer Against Traditional Machine Learning Models},\n  journal = {EarthArXiv [preprint]},\n  year = {2025},\n  doi = {10.31223/X55X7X}\n}'
  },
  emotion: {
    section:'research',eyebrow:'Research / Vision & human interaction',title:'Typing with Emotions.',
    summary:'Exploring facial-expression cues as an additional layer of context in text interaction.',
    status:'TechRxiv preprint · Research prototype',
    context:'Short text messages can leave tone ambiguous. This research explores connecting facial-expression recognition with expressive messaging cues. The public notebook provides a separate view into expression-model development.',
    approach:['Study facial-expression recognition as an input to expressive interfaces.','Explore how predicted categories can be represented alongside text.','Keep the model’s prediction distinct from a person’s internal emotional state.'],
    role:'Collaborative research, with a publicly available preprint and independently published expression-model notebook.',
    boundary:'Facial-expression classification is not a direct measurement of internal emotion. No unverified accuracy number or demonstrated user-benefit claim is asserted here.',
    stack:['Computer vision','Expression recognition','Human interaction'],
    links:[{label:'Read the public preprint',url:'https://doi.org/10.36227/techrxiv.175416003.30236370/v1'},{label:'Explore the public notebook',url:'https://github.com/mgunjan67/EmojiFaceChat'}]
  },
  atlas: {
    section:'products',eyebrow:'Independent build / Decision systems',title:'Atlas',
    summary:'An evidence-first dashboard that connects source updates, human-reviewed rules, and explainable decisions.',
    status:'Independent project · Public source · Fictional sample data',
    context:'Atlas is a local Python application with a browser interface and SQLite storage. Its public repository documents source monitoring, rule review, deterministic wage calculations, and decision history.',
    approach:['Retain source evidence when a publication changes.','Review proposed rules before calculations use them.','Keep previous results and decision receipts available for inspection.'],
    role:'Independent application development. The public repository contains the application, setup instructions, and sample-data workflow.',
    boundary:'The demonstration uses fictional authorities and employee records. It is a software project, not legal guidance or a real-world compliance determination. The card is an original interface illustration.',
    stack:['Python','SQLite','Browser interface','Human review'],
    links:[{label:'Source & setup instructions',url:'https://github.com/mgunjan67/atlas-compliance'}]
  },
  coherencygraph: {
    section:'products',eyebrow:'Open research software / Signal processing',title:'CoherencyGraph-DAS',
    summary:'Reproducible software for examining covariance learning and the information supported by fibre-optic measurements.',
    status:'Independent research software · Public source and releases',
    context:'The public project distinguishes prediction at observed sensing separations, valid covariance structure, identification assumptions, and processing utility. Its repository documents reproducible examples and versioned scientific releases.',
    approach:['Make measurement geometry and modelling assumptions explicit.','Use a data-free example to explore ambiguity away from observed separations.','Follow versioned releases and replay instructions to inspect the research software.'],
    role:'Co-developed independent research software with Badri Raj Lamichhane. This summary is limited to the publicly released project documentation.',
    boundary:'The software does not establish earthquake prediction or an operational early-warning system. Dataset and derived-asset licenses remain those recorded by the public project.',
    stack:['Python','Scientific ML','Covariance','Reproducibility'],
    links:[{label:'Explore the public source',url:'https://github.com/mgunjan67/coherencygraph-das'},{label:'Browse public releases',url:'https://github.com/mgunjan67/coherencygraph-das/releases'}]
  },
  'ball-vision': {
    section:'products',eyebrow:'Independent experiment / Computer vision',title:'Ball Vision',
    summary:'A public YOLOv9 training notebook for experimenting with ball detection.',
    status:'Independent learning project · Public notebook',
    context:'The published repository includes a ball-detection training notebook and result artifacts such as precision–recall plots, a confusion matrix, and training curves.',
    approach:['Explore an object-detection training workflow.','Inspect the published training outputs and diagnostic plots.','Use the notebook as an inspectable experiment rather than a hosted product claim.'],
    role:'Independent computer-vision project, published as ball_detection_yolov9_custom.',
    boundary:'The card is a conceptual illustration. No live inference, trajectory-tracking capability, or independently verified performance number is claimed.',
    stack:['YOLOv9','Object detection','Jupyter'],
    links:[{label:'View the notebook & results',url:'https://github.com/mgunjan67/ball_detection_yolov9_custom'}]
  },
  'signal-sketch': {
    section:'products',eyebrow:'Original portfolio experiment / Try it live',title:'SignalSketch',
    summary:'A small signal playground: change a frequency, add synthetic noise, and see what a moving average does.',
    status:'New portfolio experiment · Runs entirely in your browser',
    context:'This original interactive demo was created for this portfolio. It generates its own mathematical signal and noise; no recorded sensor dataset or external service is involved.',
    approach:['Adjust the number of cycles in a one-second synthetic signal.','Control the noise amplitude and compare the trace with its clean reference.','Toggle a simple moving average to explore smoothing and loss of detail.'],
    role:'An original, self-contained demonstration built as part of the portfolio. Its source is included with the website.',
    boundary:'An educational visualization, not a scientific result or a signal-recovery benchmark. Smoothing can suppress noise and also change the underlying signal shape.',
    stack:['JavaScript','Canvas','Synthetic signals'],demo:'signal',links:[]
  }
};
