const Question = require('../models/Question');

// @desc    Get randomized questions with optional filters
// @route   GET /api/questions
// @access  Public
const getQuestions = async (req, res) => {
  try {
    const { category, subCategory, source, chapter, limit } = req.query;

    // Build the $match stage dynamically from query params
    const matchStage = { isActive: true };

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
        source: "Bailey's ENT MCQ BOOK",
        chapter: 'Ch 1: Basic Science',
        stem: 'A 35-year-old man presents with progressive unilateral hearing loss over 6 months. Audiometry reveals a sensorineural pattern with speech discrimination disproportionately worse than the pure tone average. Weber test lateralises to the contralateral ear and Rinne is positive bilaterally. MRI with gadolinium shows a 1.5 cm enhancing mass at the cerebellopontine angle. Which of the following is the most likely cell of origin for this tumour?',
        options: [
          'Astrocytes of the vestibulocochlear nerve',
          'Schwann cells of the vestibular division of CN VIII',
          'Arachnoid cap cells of the meninges',
          'Oligodendrocytes of the cochlear nerve',
          'Fibroblasts of the internal auditory meatus',
        ],
        correctAnswer: 'Schwann cells of the vestibular division of CN VIII',
        rationale:
          "The clinical and radiological findings are classic for a vestibular schwannoma (acoustic neuroma). Despite the name, these tumours arise from Schwann cells — specifically those of the vestibular division of cranial nerve VIII, not the cochlear division. They are the most common cerebellopontine angle tumour (~80%). Meningiomas arise from arachnoid cap cells and are the second most common CPA tumour but typically have a dural tail on MRI. Astrocytes and oligodendrocytes are CNS glial cells and do not produce peripheral nerve sheath tumours. Fibroblasts may contribute to neurofibromas but are not the primary cell of origin for schwannomas.",
        highYieldSummary:
          'Vestibular schwannoma: arises from Schwann cells of the VESTIBULAR (not cochlear) division of CN VIII. Most common CPA tumour. Associated with NF2 when bilateral. Classic triad: unilateral SNHL + tinnitus + disequilibrium. Gold-standard investigation: MRI with gadolinium. Treatment options: observation, stereotactic radiosurgery, or microsurgical excision.',
        isActive: true,
      },
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: "Bailey's ENT MCQ BOOK",
        chapter: 'Ch 2: Rhinology and Allergy',
        stem: 'A 42-year-old woman with a history of asthma and aspirin sensitivity presents with bilateral nasal obstruction, anosmia, and thick mucopurulent nasal discharge for over 12 weeks. CT sinuses shows bilateral pan-sinus opacification with expansion of the ethmoid sinuses. Nasal endoscopy reveals bilateral nasal polyps filling both nasal cavities. Which of the following best describes the underlying immunological mechanism driving polyp formation in this patient?',
        options: [
          'Type I (IgE-mediated) hypersensitivity with eosinophilic infiltration',
          'Type III (immune complex-mediated) vasculitis of the nasal mucosa',
          'Type IV (delayed-type) hypersensitivity driven by Th1 lymphocytes',
          'Type II (antibody-mediated cytotoxic) reaction against nasal epithelium',
          'Non-immunological autonomic dysfunction of the nasal vasculature',
        ],
        correctAnswer: 'Type I (IgE-mediated) hypersensitivity with eosinophilic infiltration',
        rationale:
          "This patient has Samter's triad (aspirin-exacerbated respiratory disease): asthma, aspirin sensitivity, and nasal polyposis. Nasal polyps in this context are driven by a Type 2 inflammatory response characterised by IgE-mediated (Type I) hypersensitivity with marked eosinophilic infiltration. The pathophysiology involves dysregulation of arachidonic acid metabolism — aspirin inhibits COX-1, shunting substrates toward the lipoxygenase pathway, leading to excessive cysteinyl leukotriene production. This drives eosinophil recruitment and mucosal oedema. Type III reactions involve immune complexes and are seen in conditions like post-streptococcal GN. Type IV reactions are T-cell mediated (e.g. contact dermatitis, TB). Type II reactions involve antibody-mediated cell destruction (e.g. autoimmune haemolytic anaemia).",
        highYieldSummary:
          "Samter's triad: asthma + aspirin sensitivity + nasal polyposis. Pathophysiology: COX-1 inhibition → shunting to lipoxygenase pathway → excess cysteinyl leukotrienes → eosinophilic inflammation. Polyps are bilateral, eosinophil-rich, and Type 2 inflammatory. Unilateral polyp in an adult = EXCLUDE antrochoanal polyp or malignancy. Management: intranasal steroids first-line, short-course oral steroids for exacerbations, FESS if refractory. Aspirin desensitisation can be offered.",
        isActive: true,
      },
      {
        category: 'MRCS Part A',
        subCategory: 'ENT',
        source: "Bailey's ENT MCQ BOOK",
        chapter: 'Ch 5: Trauma',
        stem: 'A 28-year-old male is brought to the emergency department after being struck in the face during an assault. He has bilateral periorbital ecchymosis, subconjunctival haemorrhage with no posterior limit, CSF rhinorrhoea from the left nostril, and anosmia. CT head shows a fracture through the cribriform plate and frontal sinus posterior wall. Which of the following structures is most at risk of injury at the cribriform plate?',
        options: [
          'Optic nerve (CN II) as it passes through the optic canal',
          'Olfactory nerve filaments (CN I) passing through the cribriform foramina',
          'Maxillary division of the trigeminal nerve (CN V2)',
          'Trochlear nerve (CN IV) within the superior orbital fissure',
          'Frontal branch of the superficial temporal artery',
        ],
        correctAnswer: 'Olfactory nerve filaments (CN I) passing through the cribriform foramina',
        rationale:
          "The cribriform plate of the ethmoid bone is perforated by ~20 olfactory nerve filaments (fila olfactoria) that pass from the nasal mucosa into the anterior cranial fossa to synapse in the olfactory bulb. Fractures through the cribriform plate directly shear these delicate filaments, causing anosmia — which this patient has. The fracture also tears the overlying dura and arachnoid, resulting in CSF rhinorrhoea. The optic nerve passes through the optic canal in the lesser wing of the sphenoid, which is posterior and lateral to the cribriform plate. CN V2 exits via the foramen rotundum. CN IV traverses the superior orbital fissure. The superficial temporal artery is an extracranial structure and is not related to the anterior skull base.",
        highYieldSummary:
          "Anterior skull base fracture signs: bilateral periorbital ecchymosis (raccoon eyes), subconjunctival haemorrhage with no posterior limit, CSF rhinorrhoea, anosmia. Cribriform plate fractures shear CN I filaments (anosmia) and tear dura (CSF leak). CSF rhinorrhoea: test with β2-transferrin (most specific) or tau protein. Do NOT pack the nose or pass NG tube through the nose. Most CSF leaks resolve with conservative management (head elevation, bed rest, stool softeners). Persistent leak >7 days → consider surgical repair.",
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

module.exports = { getQuestions, seedQuestions };