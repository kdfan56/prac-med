const Question = require('../models/Question');

// @desc    Get demo questions (no auth required)
// @route   GET /api/questions/demo
// @access  Public
const getDemoQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isDemo: true, isActive: true });
    res.json({ count: questions.length, questions });
  } catch (error) {
    console.error('Error fetching demo questions:', error.message);
    res.status(500).json({ message: 'Server error fetching demo questions' });
  }
};

// @desc    Get randomized questions with optional filters
// @route   GET /api/questions
// @access  Public
const getQuestions = async (req, res) => {
  try {
    const { category, subCategory, source, chapter, limit } = req.query;

    // Build the $match stage dynamically from query params
    const matchStage = { isActive: true, isDemo: false };

    if (category) matchStage.category = category;
    if (subCategory) matchStage.subCategory = subCategory;
    if (source) matchStage.source = source;
    if (chapter) matchStage.chapter = chapter;

    const sampleSize = Math.min(parseInt(limit) || 10, 50);

    const questions = await Question.aggregate([
      { $match: matchStage },
      { $sample: { size: sampleSize } },
    ]);

    res.json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error.message);
    res.status(500).json({ message: 'Server error fetching questions' });
  }
};

// @desc    Seed the database with dummy questions
// @route   POST /api/questions/seed
// @access  Public (dev only)
const seedQuestions = async (req, res) => {
  try {
    const seedData = [
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: 'Dhingra',
        chapter: 'Otology',
        stem: 'A patient diagnosed with Ménière\'s disease presents to the ENT outpatient department. In addition to standard medical therapy, which of the following minerals is most appropriate to be added to the treatment plan?',
        options: [
          'Zinc',
          'Selenium',
          'Manganese',
          'Magnesium',
          'Calcium',
        ],
        correctAnswer: 'Magnesium',
        rationale:
          'Although mineral supplementation has no established role in most studies and standard textbooks for the management of Ménière\'s disease, NHS guidance and a few studies suggest a possible adjunctive role for magnesium. Among the given options, magnesium is the most appropriate choice, as the other minerals have no documented role at all in the management of Ménière\'s disease.',
        highYieldSummary:
          'Ménière\'s disease triad: episodic vertigo + sensorineural hearing loss + tinnitus (± aural fullness). Management: low-salt diet, betahistine, thiazide diuretics. Magnesium may have an adjunctive role per NHS guidance. Refractory cases: intratympanic gentamicin or dexamethasone, endolymphatic sac decompression.',
        isDemo: true,
        isActive: true,
      },
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: 'Dhingra',
        chapter: 'Otology',
        stem: 'A patient with temporal bone fracture presents with facial nerve palsy. Which of the following is an indication for surgical exploration of the facial nerve?',
        options: [
          'Incomplete immediate facial palsy',
          'Delayed incomplete facial palsy',
          'ENoG showing more than 90% degeneration',
          'EMG showing polyphasic potentials',
          'Severe vertigo',
        ],
        correctAnswer: 'ENoG showing more than 90% degeneration',
        rationale:
          'Facial nerve exploration in temporal bone fracture is indicated in immediate complete palsy or when ENoG shows more than 90% degeneration. Incomplete or delayed palsy is generally managed conservatively with steroids and observation. Polyphasic potentials on EMG suggest nerve regeneration (a good prognostic sign). Severe vertigo alone is not an indication for facial nerve exploration.',
        highYieldSummary:
          'Temporal bone fracture + facial palsy: Immediate complete palsy or ENoG >90% degeneration → surgical exploration. Delayed/incomplete palsy → conservative (steroids, observation). ENoG is most useful at 3–14 days post-injury. Polyphasic potentials on EMG = regeneration = good prognosis.',
        isDemo: true,
        isActive: true,
      },
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: 'Dhingra',
        chapter: 'Head & Neck',
        stem: 'A 55-year-old male presents with an ulceroproliferative lesion involving the hard palate. Biopsy confirms squamous cell carcinoma. Which of the following is the most appropriate investigation to assess the extent of the disease?',
        options: [
          'Orthopantomogram (OPG)',
          'MRI of face',
          'Contrast-enhanced CT scan of maxilla',
          'PET-CT scan',
        ],
        correctAnswer: 'Contrast-enhanced CT scan of maxilla',
        rationale:
          'For squamous cell carcinoma of the hard palate, contrast-enhanced CT of the maxilla is the investigation of choice to assess local extent including bony involvement. OPG is useful for dental assessment but does not adequately delineate soft tissue or bony invasion of the palate. MRI is better for soft tissue detail but CT is preferred for bony assessment of the maxilla. PET-CT is used for staging distant metastases or unknown primaries, not for local extent assessment.',
        highYieldSummary:
          'Hard palate SCC: CECT maxilla is the investigation of choice for local extent (bone erosion, antral invasion). MRI is complementary for perineural spread and soft tissue margins. PET-CT for distant staging. Treatment: infrastructure maxillectomy ± post-op radiotherapy.',
        isDemo: true,
        isActive: true,
      },
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: 'Dhingra',
        chapter: 'Head & Neck',
        stem: 'The most common benign tumor of the parotid gland overall is:',
        options: [
          'Hemangioma',
          'Pleomorphic adenoma',
          'Warthin tumor',
          'Mucoepidermoid tumor',
        ],
        correctAnswer: 'Pleomorphic adenoma',
        rationale:
          'Pleomorphic adenoma (mixed tumor) is the most common benign tumor of the parotid gland overall, accounting for ~60–70% of all parotid tumors. It arises from both epithelial and myoepithelial elements. Warthin tumor (papillary cystadenoma lymphomatosum) is the second most common benign parotid tumor. Mucoepidermoid carcinoma is the most common malignant salivary gland tumor. Hemangioma is the most common parotid tumor in infants but not the most common overall.',
        highYieldSummary:
          'Most common benign parotid tumor overall: pleomorphic adenoma. Most common in infants: hemangioma (only when age is specifically mentioned). Most common malignant salivary tumor: mucoepidermoid carcinoma. Pleomorphic adenoma: treated by superficial parotidectomy. Can undergo malignant transformation → carcinoma ex pleomorphic adenoma.',
        isDemo: true,
        isActive: true,
      },
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: 'Scott Brown',
        chapter: 'Laryngology',
        stem: 'A patient with vocal cord paralysis undergoes laryngeal EMG, which shows spontaneous firing but no voluntary motor unit activity. This finding indicates:',
        options: [
          'No prognostic significance',
          'EMG should be repeated',
          'No chance of recovery',
          '75% chance of recovery',
          '50% chance of recovery',
        ],
        correctAnswer: 'No chance of recovery',
        rationale:
          'On laryngeal EMG, spontaneous activity (fibrillation potentials) without voluntary motor unit potentials indicates denervation with poor prognosis and essentially no likelihood of functional recovery. Fibrillation potentials represent spontaneous depolarisation of denervated muscle fibres. The absence of voluntary motor unit potentials means there is no intact neural connection to the muscle. Presence of voluntary or polyphasic potentials would suggest regeneration and a better prognosis.',
        highYieldSummary:
          'Laryngeal EMG interpretation: Fibrillations + no voluntary motor units = denervation = no recovery. Polyphasic potentials = regeneration = good prognosis. Normal motor units = neuropraxia = full recovery expected. EMG is most useful 2–6 weeks after onset of paralysis. Guides decision between observation vs. medialization thyroplasty.',
        isDemo: true,
        isActive: true,
      },
    ];

    await Question.deleteMany({});
    const inserted = await Question.insertMany(seedData);

    res.status(201).json({
      message: `Database cleared and ${inserted.length} questions seeded successfully.`,
      count: inserted.length,
      questions: inserted,
    });
  } catch (error) {
    console.error('Error seeding questions:', error.message);
    res.status(500).json({ message: 'Server error seeding questions' });
  }
};

module.exports = { getQuestions, getDemoQuestions, seedQuestions };