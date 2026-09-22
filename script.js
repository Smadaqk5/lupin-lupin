/**
 * Lupin AI: Student Model Training & Verified Task Marketplace
 * Pure Vanilla JavaScript Application Core
 */

// Application State Schema
const INITIAL_PROFILE = {
  name: 'John Doe',
  studentId: 'STU-2024-001',
  phone: '+1 234 567 8900',
  gender: 'Prefer not to say',
  dob: '2002-05-14',
  studentEmail: 'student@university.edu',
  altEmail: 'personal@gmail.com',
  formerSchoolEmail: 'former@school.edu',
  bankName: 'Chase',
  idCardFront: 'id_front_sample.png',
  idCardBack: 'id_back_sample.png',
  handle: '@johndoe_ml',
  university: 'Stanford University',
  degree: "B.S. Computer Science '26",
  email: 'student@university.edu',
  isVerifiedStudent: true,
  xp: 250,
  level: 1,
  computeCredits: 1000,
  streakDays: 5,
  completedTutorialIds: ['mission-lora-basics'],
  completedQuizIds: ['quiz-1'],
  trainedModelIds: ['mod-sample-1'],
  unlockedBadgeIds: ['badge-first-epoch', 'badge-verified-scholar'],
  taskEarningsTotal: 0.00,
  taskEarningsPending: 0.00,
  completedTasks: []
};

// Verified Paid Tasks & Bounties Catalog
const TASKS = [
  {
    id: 'task-rlhf-proofs',
    title: 'RLHF Step-by-Step Reasoning Chain Comparison',
    category: 'alignment',
    categoryLabel: 'RLHF & Alignment',
    difficulty: 'Intermediate',
    hourlyRate: 55,
    weeklyMin: 1100,
    weeklyMax: 2200,
    mentor: 'Dr. Sarah Lin · Stanford HAI',
    openings: 14,
    summary: 'Evaluate paired frontier model reasoning traces on mathematical proofs, deductive logic, and algorithm traces. Identify subtle hallucinations, reward truthfulness, and annotate flawed steps.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> Evaluate 10 pairwise reasoning traces in standard ChatML format, marking preference (A &gt; B, B &gt; A, or Tie) and tagging the exact token index where the first deductive error occurred.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>100% adherence to step-by-step mathematical truthfulness</li>
            <li>No unjustified leaps in proof derivations</li>
            <li>Explanation of preference must cite primary axiom or theorem</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~15 mins / comparison',
    requiredSkills: ['Proof Verification', 'Chain-of-Thought', 'ChatML']
  },
  {
    id: 'task-peft-benchmark',
    title: 'PyTorch PEFT & LoRA Checkpoint Benchmarking',
    category: 'peft',
    categoryLabel: 'Model Engineering',
    difficulty: 'Advanced',
    hourlyRate: 75,
    weeklyMin: 1500,
    weeklyMax: 3000,
    mentor: 'Alex Mercer · MIT CSAIL',
    openings: 5,
    summary: 'Train, evaluate, and benchmark rank r=8 vs r=16 LoRA adapter checkpoints on Gemma 2 and Llama 3 across GSM8K and MMLU subsets. Submit reproducible training logs and validation perplexity.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> GitHub repository containing training config, loss curves exported from W&amp;B / TensorBoard, and adapter_model.safetensors uploaded to Hugging Face Hub.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>Validation loss &lt; 0.55 with smooth convergence</li>
            <li>Zero loss masking on system instructions and input prompts</li>
            <li>Adapter parameters strictly &lt; 0.2% of base model weights</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~45 mins / benchmark run',
    requiredSkills: ['PyTorch 2.x', 'peft / transformers', 'Safetensors']
  },
  {
    id: 'task-redteam-prompts',
    title: 'Adversarial Red-Teaming & Prompt Injection Testing',
    category: 'redteam',
    categoryLabel: 'Safety Red-Teaming',
    difficulty: 'Advanced',
    hourlyRate: 65,
    weeklyMin: 1300,
    weeklyMax: 2600,
    mentor: 'Maya Patel · CMU CyLab',
    openings: 8,
    summary: 'Construct multi-turn adversarial dialogue sequences, system prompt extraction vectors, and jailbreak payloads to probe frontier model guardrails and refusal consistency.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> JSON dataset of 25 multi-turn jailbreak attempts classified under MITRE ATLAS vulnerability categories with safety model refusal transcripts.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>Novel attack vectors (base64 obfuscation, virtual persona, delimiter leakage)</li>
            <li>No redundant paraphrases; each probe must target distinct guardrail boundary</li>
            <li>Clean formatting with verifiable system prompt transcripts</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~30 mins / attack probe',
    requiredSkills: ['Security Mindset', 'Prompt Engineering', 'Adversarial ML']
  },
  {
    id: 'task-code-ast',
    title: 'Code LLM AST Debugging & Pytest Generation',
    category: 'code',
    categoryLabel: 'Code & AST Logic',
    difficulty: 'Intermediate',
    hourlyRate: 60,
    weeklyMin: 1200,
    weeklyMax: 2400,
    mentor: 'David K. · Vector Institute / U of Toronto',
    openings: 11,
    summary: 'Review synthetically generated Python, Rust, and TypeScript code snippets. Detect subtle off-by-one errors and edge-case memory leaks, write comprehensive Pytest suites, and annotate AST anomalies.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> Pytest or Cargo test suite asserting 100% branch coverage on the target algorithmic implementation, accompanied by bug annotations.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>Tests pass on canonical reference solutions and reliably fail on buggy code</li>
            <li>Inclusion of edge cases: empty collections, recursion bounds, integer overflow</li>
            <li>Clean PEP8 and type hinted test harnesses</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~25 mins / test harness',
    requiredSkills: ['Python / Pytest', 'AST Parsing', 'Data Structures']
  },
  {
    id: 'task-med-factcheck',
    title: 'Biomedical & Clinical Abstract Fact-Checking',
    category: 'stem',
    categoryLabel: 'STEM & Medical',
    difficulty: 'Expert',
    hourlyRate: 85,
    weeklyMin: 1700,
    weeklyMax: 3400,
    mentor: 'Dr. Aris Thorne · Harvard Medical School',
    openings: 4,
    summary: 'Validate clinical assertions extracted by models against PubMed primary literature. Verify pharmacological dosing, CYP interactions, contraindications, and statistical confidence intervals.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> Annotated clinical dataset with direct DOI citations, ICD-10 cross-references, and calibrated confidence scores for each extracted claim.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>100% citation grounding in peer-reviewed PubMed indexed trials</li>
            <li>Rigorous contraindication checking (especially renal/hepatic clearance)</li>
            <li>Zero toleration for hallucinated dosage units</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~35 mins / dossier',
    requiredSkills: ['Pharmacology / STEM', 'PubMed Literature', 'Clinical NLP']
  },
  {
    id: 'task-multimodal-grounding',
    title: 'Multimodal Vision-Language Dataset Grounding',
    category: 'alignment',
    categoryLabel: 'RLHF & Alignment',
    difficulty: 'Beginner',
    hourlyRate: 48,
    weeklyMin: 960,
    weeklyMax: 1920,
    mentor: 'Marcus Vance · Berkeley BAIR Lab',
    openings: 9,
    summary: 'Inspect high-resolution biomedical charts, patent schematics, and UI screenshots. Verify polygon bounding coordinates, spatial reasoning prompts, and dense descriptive captions.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> Cleaned JSONL dataset containing verified coordinates [ymin, xmin, ymax, xmax] mapped to dense descriptive text for visual question answering.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>IoU overlap &gt; 0.92 against reference bounding polygons</li>
            <li>Accurate description of chart axes, units, and legend indicators</li>
            <li>No hallucinated chart elements</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~10 mins / diagram',
    requiredSkills: ['Visual QA', 'Spatial Reasoning', 'Bounding Boxes']
  },
  {
    id: 'task-dataset-dedup',
    title: 'Instruction-Tuning Dataset Cleaning & De-duplication',
    category: 'peft',
    categoryLabel: 'Model Engineering',
    difficulty: 'Beginner',
    hourlyRate: 42,
    weeklyMin: 840,
    weeklyMax: 1680,
    mentor: 'Chloe Dupont · ETH Zürich ML Group',
    openings: 18,
    summary: 'Filter out low-quality conversational noise, synthetic artifacts, and semantic duplicates in open instruction-tuning sets using embedding cosine distances and MinHash LSH.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> Python cleaning script and cleaned Parquet dataset with duplicate removal log and perplexity filtering report.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>Preserves rare domain terminology while eliminating near-verbatim clones</li>
            <li>Regex checks for token garbage, broken Unicode, and markdown leaks</li>
            <li>Benchmark metrics before/after filtering</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~10 mins / cluster',
    requiredSkills: ['Data Cleaning', 'Regex / MinHash', 'Parquet / Pandas']
  },
  {
    id: 'task-math-proofs',
    title: 'Formal Mathematical Proof Verification',
    category: 'stem',
    categoryLabel: 'STEM & Medical',
    difficulty: 'Advanced',
    hourlyRate: 70,
    weeklyMin: 1400,
    weeklyMax: 2800,
    mentor: 'Prof. Julian Vance · Oxford Mathematical Institute',
    openings: 6,
    summary: 'Verify Olympiad-level algebraic and discrete geometry proof steps. Check for inductive leaps, illicit operations, and unstated assumptions in synthetic training traces.',
    rubric: `
      <div class="space-y-2">
        <p><strong>Deliverable:</strong> Step-by-step annotation of 15 Olympiad-level synthetic solutions in LaTeX/Markdown with verification of lemma applicability.</p>
        <div class="p-2.5 bg-[#12131A] rounded-lg border border-[#232533] space-y-1">
          <div class="text-[#D3FB52] font-bold">Review Rubric:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-[#8E92A4]">
            <li>Verification of boundary conditions (n=0, empty set, degenerate geometry)</li>
            <li>Explicit confirmation of inductive hypothesis steps</li>
            <li>LaTeX syntax hygiene</li>
          </ul>
        </div>
      </div>
    `,
    timeEstimate: '~30 mins / proof',
    requiredSkills: ['Higher Mathematics', 'LaTeX', 'Deductive Logic']
  }
];

const BADGES = [
  { id: 'badge-first-epoch', name: 'First Epoch Run', icon: '🚀', description: 'Initiated and completed your first simulated LoRA fine-tuning run.' },
  { id: 'badge-lora-pro', name: 'LoRA Architect', icon: '⚡', description: 'Trained a high-rank (r >= 16) adapter targeting attention projection layers.' },
  { id: 'badge-loss-hero', name: 'Convergence Hero', icon: '📉', description: 'Achieved an evaluation loss strictly below 0.60 on a domain dataset.' },
  { id: 'badge-peer-supporter', name: 'Master Tutor', icon: '🤝', description: 'Authored an accepted answer in the peer troubleshooting forum.' },
  { id: 'badge-dataset-curator', name: 'Data Alchemist', icon: '🧪', description: 'Mastered ChatML instruction formatting and loss-masking.' },
  { id: 'badge-verified-scholar', name: 'Verified Scholar', icon: '🎓', description: 'Confirmed academic status with accredited university email.' },
];

const TUTORIALS = [
  {
    id: 'mission-lora-basics',
    title: '1. LoRA & PEFT Foundations',
    difficulty: 'Beginner',
    timeMinutes: 12,
    xpReward: 120,
    summary: 'Why full fine-tuning exhausts student GPU VRAM and how low-rank decomposition updates weights with 0.1% parameters.',
    content: `
      <div class="space-y-4 text-xs sm:text-sm text-[#9496A8] leading-relaxed">
        <p>
          Fine-tuning modern foundation models (like Gemma 2, Llama 3, or Mistral) requires updating billions of weights. In standard full fine-tuning, every single parameter matrix requires gradient tensors and optimizer states (Adam's first and second moments), which typically demands 4&times; to 6&times; more GPU VRAM than model weights alone.
        </p>

        <div class="p-4 rounded-xl bg-[#090A0E] border border-[#232533] space-y-2">
          <div class="font-bold text-[#D3FB52] text-xs uppercase tracking-wider">The Low-Rank Adaptation (LoRA) Equation</div>
          <div class="font-mono text-xs text-white bg-[#12131A] p-3 rounded-lg border border-[#232533] text-center">
            W = W<sub>0</sub> + &Delta;W = W<sub>0</sub> + (B &times; A) &times; (&alpha; / r)
          </div>
          <p class="text-xs text-[#8E92A4]">
            Instead of updating the full weight tensor &Delta;W of dimension (d &times; k), LoRA decomposes &Delta;W into two low-rank matrices: A &isin; &reals;<sup>r &times; k</sup> and B &isin; &reals;<sup>d &times; r</sup>, where the intrinsic rank r &Lt; min(d, k).
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 rounded-xl bg-[#12131A] border border-[#232533] space-y-1">
            <span class="font-bold text-[#D3FB52]">Matrix A (Dimension r &times; k)</span>
            <p class="text-[#8E92A4]">Initialized with random Gaussian values. Contracts high-dimensional token representations down to bottleneck rank r.</p>
          </div>
          <div class="p-3.5 rounded-xl bg-[#12131A] border border-[#232533] space-y-1">
            <span class="font-bold text-emerald-400">Matrix B (Dimension d &times; r)</span>
            <p class="text-[#8E92A4]">Initialized with exact zeros. Expands low-rank features back to model dimension d. Initializing to zero guarantees &Delta;W = 0 at step 0.</p>
          </div>
        </div>
      </div>
    `,
    quiz: {
      id: 'quiz-1',
      question: 'Why is Matrix B in LoRA initialized with exact zeros at the beginning of training?',
      options: [
        'To prevent memory allocations in CUDA VRAM',
        'So the initial adapter output ΔW is zero, ensuring the model behaves identically to the pre-trained base model at step 0',
        'To accelerate the AdamW optimizer step by skipping matrix multiplication',
        'Because zero weights do not produce gradients in backward propagation'
      ],
      correctIndex: 1,
      explanation: 'By initializing B with zeros and A with Gaussian noise, B × A = 0 at step 0. This preserves the base foundation model capabilities before any gradient updates occur.'
    }
  },
  {
    id: 'mission-chatml-datasets',
    title: '2. ChatML & Assistant Loss Masking',
    difficulty: 'Intermediate',
    timeMinutes: 15,
    xpReward: 140,
    summary: 'Learn how to tokenize conversation transcripts using ChatML and mask user prompt tokens with -100 so loss is computed solely on assistant responses.',
    content: `
      <div class="space-y-4 text-xs sm:text-sm text-[#9496A8] leading-relaxed">
        <p>
          Language models are trained with causal next-token cross-entropy loss. However, in instruction fine-tuning, we only want the model to learn how to generate the <em>Assistant response</em>, not memorize user instructions or system prompts.
        </p>

        <div class="p-4 rounded-xl bg-[#090A0E] border border-[#232533] space-y-2">
          <div class="font-bold text-[#D3FB52] text-xs uppercase tracking-wider">PyTorch Loss Masking Pattern (-100)</div>
          <p class="text-xs text-[#8E92A4]">
            In PyTorch's <code class="text-[#D3FB52] font-mono">torch.nn.CrossEntropyLoss</code>, the default <code class="text-white font-mono">ignore_index</code> is set to <strong>-100</strong>. Any target token assigned the index -100 contributes zero loss and produces no backpropagated gradients!
          </p>
        </div>

        <div class="p-3.5 rounded-xl bg-[#090A0E] border border-[#232533] font-mono text-xs text-[#9496A8] overflow-x-auto space-y-1">
          <div><span class="text-[#8E92A4]"># ChatML Structure</span></div>
          <div><span class="text-emerald-400">&lt;|im_start|&gt;system</span> You are an expert pharmacology tutor.&lt;|im_end|&gt;</div>
          <div><span class="text-emerald-400">&lt;|im_start|&gt;user</span> Explain why renal clearance affects metformin dosing.&lt;|im_end|&gt;</div>
          <div><span class="text-[#D3FB52]">&lt;|im_start|&gt;assistant</span> Metformin is renally cleared; impaired filtration causes lactic acidosis...&lt;|im_end|&gt;</div>
        </div>
      </div>
    `,
    quiz: {
      id: 'quiz-2',
      question: 'What happens when target token labels are set to -100 in PyTorch CrossEntropyLoss during fine-tuning?',
      options: [
        'The GPU throws a CUDA index out-of-bounds assertion failure',
        'Those specific tokens are ignored by the loss computation and backpropagate zero gradients',
        'The tokenizer replaces them with padding tokens automatically',
        'The learning rate is temporarily reduced by 50%'
      ],
      correctIndex: 1,
      explanation: 'ignore_index=-100 informs PyTorch to skip those indices during loss calculation, preventing the model from wasting gradient capacity on fixed user prompts.'
    }
  },
  {
    id: 'mission-hyperparams',
    title: '3. Hyperparameters: Rank, Alpha & Learning Rate',
    difficulty: 'Intermediate',
    timeMinutes: 14,
    xpReward: 150,
    summary: 'Master the relationship between LoRA Rank r, LoRA Alpha scaling factor, and learning rate scheduling with warmup.',
    content: `
      <div class="space-y-4 text-xs sm:text-sm text-[#9496A8] leading-relaxed">
        <p>
          Selecting appropriate hyperparameters is the difference between smooth convergence and catastrophic forgetting or divergence.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 rounded-xl bg-[#12131A] border border-[#232533] space-y-1">
            <span class="font-bold text-white">Rank (r) & Alpha (&alpha;)</span>
            <p class="text-[#8E92A4]">The adapter update is scaled by (&alpha; / r). Common practice sets &alpha; = 2r (e.g., r=8, &alpha;=16 or r=16, &alpha;=32). When adjusting r, keeping &alpha; proportional prevents loss spikes.</p>
          </div>
          <div class="p-3.5 rounded-xl bg-[#12131A] border border-[#232533] space-y-1">
            <span class="font-bold text-[#D3FB52]">Learning Rate for LoRA</span>
            <p class="text-[#8E92A4]">Because base weights are frozen and only adapter matrices are trained, LoRA typically requires higher learning rates (1e-4 to 3e-4) compared to full fine-tuning (1e-5 to 5e-5).</p>
          </div>
        </div>
      </div>
    `,
    quiz: {
      id: 'quiz-3',
      question: 'Why do we typically use a higher learning rate (e.g. 2e-4) for LoRA than for full model fine-tuning (e.g. 2e-5)?',
      options: [
        'Because low-rank adapter matrices are initialized from scratch and need aggressive initial updates while base weights remain frozen',
        'Because higher learning rates prevent VRAM out-of-memory errors',
        'Because 16-bit precision automatically divides the learning rate by 10',
        'Because PyTorch AdamW requires r > 16 to compute momentum'
      ],
      correctIndex: 0,
      explanation: 'Since 99.8% of the model is frozen and LoRA matrices start near or at zero, a larger learning rate allows the new parameters to adapt efficiently without destabilizing existing representations.'
    }
  },
  {
    id: 'mission-convergence',
    title: '4. Diagnosing Overfitting & Loss Curves',
    difficulty: 'Advanced',
    timeMinutes: 16,
    xpReward: 160,
    summary: 'Identify early signs of overfitting when training loss drops while validation loss diverges, and apply weight decay & dropout.',
    content: `
      <div class="space-y-4 text-xs sm:text-sm text-[#9496A8] leading-relaxed">
        <p>
          A lower training loss does not always equal a superior model. When fine-tuning on small student datasets (1,000–5,000 examples), models can easily overfit and memorize exact phrasing rather than generalizing.
        </p>

        <div class="p-4 rounded-xl bg-[#090A0E] border border-[#232533] space-y-2">
          <div class="font-bold text-emerald-400 text-xs uppercase tracking-wider">The Golden Divergence Signal</div>
          <p class="text-xs text-[#8E92A4]">
            If Train Loss continues descending (e.g. 0.45 &rarr; 0.20) but Validation Loss flattens and starts creeping up (e.g. 0.58 &rarr; 0.72), the model has entered the overfitting regime. Best practice is to save the checkpoint at the validation loss minimum.
          </p>
        </div>
      </div>
    `,
    quiz: {
      id: 'quiz-4',
      question: 'What is the optimal checkpoint selection strategy when validation loss begins to diverge?',
      options: [
        'Always pick the checkpoint from the final epoch regardless of validation metrics',
        'Select the checkpoint with the lowest validation loss (early stopping checkpoint)',
        'Double the learning rate and train for 5 more epochs',
        'Increase LoRA rank to 64 immediately'
      ],
      correctIndex: 1,
      explanation: 'Selecting the model at the lowest validation loss ensures maximum generalization power before the model starts memorizing dataset artifacts.'
    }
  }
];

const CODE_TEMPLATES = {
  lora_peft: {
    fileName: 'fine_tune_lora.py',
    objective: 'Configure LoRA adapter with Hugging Face PEFT',
    code: `import torch
from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM, AutoTokenizer

# 1. Load pre-trained foundation model in FP16
model_id = "google/gemma-2-2b"
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto"
)

# 2. Configure PEFT LoRA adapter
peft_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=8,                       # Low-rank dimension
    lora_alpha=16,             # Alpha scaling factor
    lora_dropout=0.05,         # Dropout probability
    target_modules=["q_proj", "v_proj"], # Attention layers
    bias="none"
)

# 3. Inject trainable adapter into foundation model
peft_model = get_peft_model(model, peft_config)
peft_model.print_trainable_parameters()
print("Ready for fine-tuning!")`,
    stdout: `[INFO] Initializing Google Gemma-2 2.6B...
trainable params: 4,194,304 || all params: 2,614,000,000 || trainable%: 0.1604%
[SUCCESS] LoRA adapter successfully attached to target attention projections!
Ready for fine-tuning!`
  },
  chatml_dataset: {
    fileName: 'tokenize_chatml.py',
    objective: 'Apply ChatML template and mask prompt tokens with -100',
    code: `import torch
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-2b")

# Sample student dialogue pair
messages = [
    {"role": "system", "content": "You are a clinical pharmacology tutor."},
    {"role": "user", "content": "Why is metformin contraindicated in renal disease?"},
    {"role": "assistant", "content": "Metformin risk of lactic acidosis increases when GFR < 30 mL/min."}
]

# Apply chat template
formatted_text = tokenizer.apply_chat_template(messages, tokenize=False)
tokens = tokenizer(formatted_text, return_tensors="pt")

# Create labels with user prompt masked to -100
labels = tokens["input_ids"].clone()
user_prompt_len = 24  # Length of system + user turn
labels[0, :user_prompt_len] = -100

print(f"Total tokens: {tokens['input_ids'].shape[1]}")
print(f"Masked tokens (-100 count): {(labels == -100).sum().item()}")
print("Loss will be computed exclusively on assistant tokens.")`,
    stdout: `Applied ChatML template formatting.
Total tokens: 42
Masked tokens (-100 count): 24
Loss will be computed exclusively on assistant tokens.
[SUCCESS] Dataset preprocessing verified!`
  },
  training_loop: {
    fileName: 'training_step.py',
    objective: 'Execute PyTorch forward, backward, and AdamW optimizer step',
    code: `import torch
from torch.optim import AdamW

# Setup simulated batch and optimizer
batch_size = 4
seq_len = 128
vocab_size = 32000

# Simulated adapter logits & targets
logits = torch.randn(batch_size, seq_len, vocab_size, requires_grad=True)
targets = torch.randint(0, vocab_size, (batch_size, seq_len))

# Cross entropy with ignore_index=-100
loss_fn = torch.nn.CrossEntropyLoss(ignore_index=-100)
loss = loss_fn(logits.view(-1, vocab_size), targets.view(-1))

# Backward pass
loss.backward()

print(f"Computed step loss: {loss.item():.4f}")
print(f"Logits gradient norm: {logits.grad.norm().item():.4f}")
print("Optimizer ready to step!")`,
    stdout: `[Forward Pass] Batch logits computed with FP16 autocast.
Computed step loss: 2.1482
Logits gradient norm: 0.4289
Optimizer ready to step!
[SUCCESS] Backward pass executed. Gradients ready for AdamW update.`
  }
};

const LEADERBOARD_USERS = [
  { rank: 1, name: 'Elena Rostova', university: 'MIT · CSAIL', models: 14, accuracy: '96.2%', xp: 1840, status: 'Fellow @ Anthropic' },
  { rank: 2, name: 'Marcus Chen', university: 'UC Berkeley · AI Lab', models: 11, accuracy: '94.8%', xp: 1560, status: 'Fellow @ Meta AI' },
  { rank: 3, name: 'Sophia Patel', university: 'Carnegie Mellon University', models: 9, accuracy: '93.5%', xp: 1390, status: 'Fellow @ Google DeepMind' },
  { rank: 4, name: 'Alex Rivera (You)', university: 'Stanford University', models: 1, accuracy: '91.8%', xp: 250, status: 'Active Candidate', isCurrentUser: true },
  { rank: 5, name: 'Liam O’Connor', university: 'University of Toronto · Vector', models: 7, accuracy: '91.2%', xp: 980, status: 'Candidate' },
  { rank: 6, name: 'Hana Tanaka', university: 'ETH Zürich · CS', models: 6, accuracy: '90.7%', xp: 840, status: 'Candidate' },
  { rank: 7, name: 'Julian Vance', university: 'Oxford University', models: 5, accuracy: '89.9%', xp: 720, status: 'Candidate' },
  { rank: 8, name: 'Amina Al-Mansoor', university: 'Georgia Tech', models: 4, accuracy: '88.5%', xp: 610, status: 'Candidate' },
];

const INITIAL_THREADS = [
  {
    id: 'thread-1',
    category: 'troubleshooting',
    title: 'CUDA out of memory on A100 when setting LoRA rank r=32 with batch size 8',
    author: 'Liam O’Connor',
    authorUni: 'Univ. of Toronto',
    authorAvatar: 'L',
    timeAgo: '2h ago',
    upvotes: 18,
    repliesCount: 4,
    body: 'I am getting "torch.cuda.OutOfMemoryError: Tried to allocate 4.20 GiB" during the first backward pass on Llama 3 8B. Does anyone recommend gradient accumulation steps or switching to 4-bit QLoRA?',
    replies: [
      {
        id: 'rep-1',
        author: 'Elena Rostova',
        authorUni: 'MIT',
        avatar: 'E',
        timeAgo: '1h ago',
        text: 'Switch to QLoRA 4-bit via bitsandbytes (`load_in_4bit=True`) and set `gradient_accumulation_steps=4` with a micro-batch size of 2. That reduces VRAM from 28GB down to ~8.5GB!',
        isAccepted: true
      }
    ]
  },
  {
    id: 'thread-2',
    category: 'datasets',
    title: 'Curated 2,400 pharmacology Q&A pairs in ChatML format — open for student evaluations',
    author: 'Sophia Patel',
    authorUni: 'CMU',
    authorAvatar: 'S',
    timeAgo: '4h ago',
    upvotes: 27,
    repliesCount: 3,
    body: 'Hey everyone, I just cleaned and validated a 2,400 example dataset focused on contraindications, CYP450 enzyme interactions, and clinical renal dosing with -100 loss masks on system instructions.',
    replies: [
      {
        id: 'rep-2',
        author: 'Marcus Chen',
        authorUni: 'UC Berkeley',
        avatar: 'M',
        timeAgo: '3h ago',
        text: 'Just fine-tuned Gemma 2 on this! Validation loss dropped to 0.49 after 3 epochs. Highly recommend.',
        isAccepted: false
      }
    ]
  },
  {
    id: 'thread-3',
    category: 'showcase',
    title: 'Gemma 2 2.6B fine-tuned with r=8 achieves 93.8% on Python type annotations benchmark',
    author: 'Alex Rivera',
    authorUni: 'Stanford',
    authorAvatar: 'A',
    timeAgo: '1d ago',
    upvotes: 34,
    repliesCount: 6,
    body: 'Trained for 3 epochs with AdamW (lr=2e-4, alpha=16). Base model regularly produced untyped signatures, while the LoRA adapter correctly generated typing.Union and Callable definitions.',
    replies: []
  }
];

// App State Manager
class AppState {
  constructor() {
    this.load();
    this.activeTutorialId = 'mission-lora-basics';
    this.activeSnippet = 'lora_peft';
    this.isTraining = false;
    this.trainingInterval = null;
    this.currentTrainStep = 0;
    this.maxTrainSteps = 24;
    this.trainLossPoints = [];
    this.evalLossPoints = [];
    this.playgroundActiveModel = {
      name: 'Gemma-2-2.6B-LoRA-r8',
      baseModel: 'google/gemma-2-2b',
      datasetName: 'Clinical Pharmacology Q&A',
      benchmarkScore: 91.8
    };
  }

  load() {
    try {
      const stored = localStorage.getItem('lupin_ai_state') || localStorage.getItem('handshake_ai_state');
      if (stored) {
        const data = JSON.parse(stored);
        this.profile = { ...INITIAL_PROFILE, ...(data.profile || {}) };
        // Reset balances to zero if matching previous seeded defaults
        if (this.profile.taskEarningsTotal === 2450) {
          this.profile.taskEarningsTotal = 0.00;
        }
        if (this.profile.taskEarningsPending === 360) {
          this.profile.taskEarningsPending = 0.00;
        }
        if (!Array.isArray(this.profile.completedTasks) || (this.profile.completedTasks.length === 4 && this.profile.completedTasks[0]?.id === 'task-c-1')) {
          this.profile.completedTasks = [];
        }
        this.threads = data.threads || [...INITIAL_THREADS];
        this.trainedModels = data.trainedModels || [
          {
            id: 'mod-sample-1',
            name: 'Gemma-2-2.6B-LoRA-r8',
            baseModel: 'google/gemma-2-2b',
            datasetName: 'Clinical Pharmacology Q&A',
            finalTrainLoss: 0.42,
            finalEvalLoss: 0.54,
            benchmarkScore: 91.8,
            createdAt: '2 days ago'
          }
        ];
        return;
      }
    } catch (e) {
      console.warn('LocalStorage load failed, using defaults', e);
    }

    this.profile = { ...INITIAL_PROFILE };
    this.threads = [...INITIAL_THREADS];
    this.trainedModels = [
      {
        id: 'mod-sample-1',
        name: 'Gemma-2-2.6B-LoRA-r8',
        baseModel: 'google/gemma-2-2b',
        datasetName: 'Clinical Pharmacology Q&A',
        finalTrainLoss: 0.42,
        finalEvalLoss: 0.54,
        benchmarkScore: 91.8,
        createdAt: '2 days ago'
      }
    ];
  }

  save() {
    try {
      localStorage.setItem('lupin_ai_state', JSON.stringify({
        profile: this.profile,
        threads: this.threads,
        trainedModels: this.trainedModels
      }));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  addXp(amount, reason = '') {
    this.profile.xp += amount;
    const oldLevel = this.profile.level;
    this.profile.level = Math.floor(this.profile.xp / 500) + 1;
    this.save();
    renderHeader();
    if (this.profile.level > oldLevel) {
      showToast(`🎉 Level Up! You reached Level ${this.profile.level} in Lupin AI!`);
    } else if (reason) {
      showToast(`+${amount} XP: ${reason}`);
    }
  }
}

const state = new AppState();

// Notification Toast
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-[#12131A] border border-[#D3FB52]/50 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold';
  toast.innerHTML = `<span class="text-[#D3FB52]">⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Navigation & Tab Switching
function initNavigation() {
  const tabButtons = document.querySelectorAll('.nav-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });

  const brand = document.getElementById('nav-brand');
  if (brand) brand.addEventListener('click', () => switchTab('tutorials'));

  const profilePill = document.getElementById('nav-profile-pill');
  if (profilePill) profilePill.addEventListener('click', () => switchTab('profile'));

  const footerVerify = document.getElementById('footer-verify-link');
  if (footerVerify) footerVerify.addEventListener('click', () => openModal('modal-verify'));
}

window.switchTab = function(tabId) {
  document.querySelectorAll('.nav-tab').forEach(b => {
    if (b.getAttribute('data-tab') === tabId) {
      b.classList.add('active', 'bg-[#D3FB52]/12', 'text-[#D3FB52]', 'border', 'border-[#D3FB52]/30');
      b.classList.remove('text-[#8E92A4]');
    } else {
      b.classList.remove('active', 'bg-[#D3FB52]/12', 'text-[#D3FB52]', 'border', 'border-[#D3FB52]/30');
      b.classList.add('text-[#8E92A4]');
    }
  });

  document.querySelectorAll('.tab-pane').forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  });

  if (tabId === 'leaderboard') renderLeaderboard();
  if (tabId === 'profile') renderDashboard();
  if (tabId === 'forums') renderForum();
  if (tabId === 'tutorials') renderTutorialSidebar();
  if (tabId === 'tasks') {
    renderTasks();
    updateEarningsCalc();
  }
};

// Render Top Navbar Header
function renderHeader() {
  const creds = document.getElementById('nav-credits-count');
  const streak = document.getElementById('nav-streak-count');
  const userXp = document.getElementById('nav-user-xp');
  const userName = document.getElementById('nav-user-name');
  const avatarChar = document.getElementById('nav-avatar-char');
  const studioCreds = document.getElementById('studio-credits-display');
  const headerVerify = document.getElementById('btn-header-verify');

  if (creds) creds.textContent = state.profile.computeCredits.toLocaleString();
  if (streak) streak.textContent = state.profile.streakDays;
  if (userXp) userXp.textContent = `Level ${state.profile.level} · ${state.profile.xp} XP`;
  if (userName) userName.textContent = state.profile.name;
  if (avatarChar) avatarChar.textContent = state.profile.name.charAt(0);
  if (studioCreds) studioCreds.textContent = `${state.profile.computeCredits.toLocaleString()} Credits`;

  if (headerVerify) {
    if (state.profile.isVerifiedStudent) {
      headerVerify.innerHTML = `
        <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#D3FB52]/15 text-[#D3FB52] border border-[#D3FB52]/30 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#D3FB52]"></span>
          ${state.profile.university.split(' ')[0]} · Verified Fellow
        </span>
      `;
    } else {
      headerVerify.innerHTML = `
        <button class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors">
          Verify Student ID
        </button>
      `;
      headerVerify.onclick = () => openModal('modal-verify');
    }
  }
}

// TAB 1: CURRICULUM & MISSIONS
function initTutorials() {
  renderTutorialSidebar();
  renderActiveTutorial();
}

function renderTutorialSidebar() {
  const container = document.getElementById('tutorial-nav-list');
  const progressText = document.getElementById('tutorial-progress-count');
  if (!container) return;

  const completedCount = state.profile.completedTutorialIds.length;
  if (progressText) {
    progressText.textContent = `${completedCount} / ${TUTORIALS.length} Complete`;
  }

  container.innerHTML = TUTORIALS.map(t => {
    const isCompleted = state.profile.completedTutorialIds.includes(t.id);
    const isActive = t.id === state.activeTutorialId;

    return `
      <div class="tutorial-item p-3.5 rounded-xl border cursor-pointer transition-all ${
        isActive
          ? 'bg-[#151722] border-[#D3FB52]/60 text-white shadow-md'
          : 'bg-[#090A0E] border-[#232533] text-[#8E92A4] hover:text-white hover:border-[#34374A]'
      }" data-tut-id="${t.id}">
        <div class="flex items-center justify-between text-xs mb-1">
          <span class="font-bold text-white truncate">${t.title}</span>
          ${isCompleted ? '<span class="text-[#D3FB52] font-black">✓ Complete</span>' : `<span class="text-[10px] text-[#D3FB52] font-mono">+${t.xpReward} XP</span>`}
        </div>
        <div class="text-[11px] text-[#8E92A4] flex items-center gap-2">
          <span>${t.difficulty}</span>
          <span>·</span>
          <span>${t.timeMinutes} mins</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.tutorial-item').forEach(el => {
    el.addEventListener('click', () => {
      state.activeTutorialId = el.getAttribute('data-tut-id');
      renderTutorialSidebar();
      renderActiveTutorial();
    });
  });
}

function renderActiveTutorial() {
  const panel = document.getElementById('tutorial-content-panel');
  if (!panel) return;

  const tut = TUTORIALS.find(t => t.id === state.activeTutorialId) || TUTORIALS[0];
  const isCompleted = state.profile.completedTutorialIds.includes(tut.id);
  const isQuizCompleted = state.profile.completedQuizIds.includes(tut.quiz.id);

  panel.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#232533] pb-4 gap-2">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">${tut.title}</h2>
            ${isCompleted ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D3FB52]/10 text-[#D3FB52] border border-[#D3FB52]/30">PASSED</span>' : ''}
          </div>
          <div class="text-xs text-[#8E92A4] mt-1">${tut.summary}</div>
        </div>
        <div class="text-xs font-mono text-[#D3FB52] tabular-nums whitespace-nowrap">
          +${tut.xpReward} Student XP
        </div>
      </div>

      <!-- Main Reading Content -->
      <div class="prose max-w-none text-[#F3F4F6]">
        ${tut.content}
      </div>

      <!-- Knowledge Check / Quiz -->
      <div class="mt-6 pt-5 border-t border-[#232533] space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span>✍️ Mission Knowledge Check</span>
            <span class="text-[10px] text-[#8E92A4] font-normal">Immediate verification</span>
          </div>
          <span class="text-xs font-mono text-[#8E92A4]">Question 1 of 1</span>
        </div>

        <div class="p-4 rounded-xl bg-[#090A0E] border border-[#232533] space-y-3">
          <div class="text-xs sm:text-sm font-semibold text-white">
            ${tut.quiz.question}
          </div>

          <div class="space-y-2" id="quiz-options-container">
            ${tut.quiz.options.map((opt, idx) => `
              <button class="quiz-option-btn w-full text-left p-3 rounded-xl border border-[#232533] bg-[#12131A] text-xs text-[#9496A8] hover:text-white hover:border-[#D3FB52]/40 transition-all flex items-start gap-2.5 cursor-pointer" data-idx="${idx}">
                <span class="font-mono text-[#8E92A4]">${String.fromCharCode(65 + idx)}.</span>
                <span class="flex-1">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-box" class="hidden p-3.5 rounded-xl text-xs space-y-1"></div>
        </div>

        <!-- Completion Actions -->
        <div class="flex items-center justify-between pt-2">
          <div class="text-xs text-[#8E92A4]">
            ${isCompleted ? '✓ Mission verified in your academic record.' : 'Answer correctly to complete mission.'}
          </div>
          <button id="btn-next-mission" class="btn-handshake-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
            Next Mission &rarr;
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind Quiz Options
  panel.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
      const feedback = document.getElementById('quiz-feedback-box');
      const isCorrect = selectedIdx === tut.quiz.correctIndex;

      panel.querySelectorAll('.quiz-option-btn').forEach(b => {
        b.disabled = true;
        b.classList.remove('hover:border-[#D3FB52]/40', 'cursor-pointer');
      });

      if (isCorrect) {
        btn.classList.add('border-[#D3FB52]', 'bg-[#D3FB52]/10', 'text-white');
        feedback.className = 'p-3.5 rounded-xl text-xs space-y-1 bg-[#D3FB52]/10 border border-[#D3FB52]/40 text-white';
        feedback.innerHTML = `
          <div class="font-bold text-[#D3FB52] flex items-center gap-1.5">✓ Correct Answer!</div>
          <div class="text-[#8E92A4]">${tut.quiz.explanation}</div>
        `;

        if (!state.profile.completedTutorialIds.includes(tut.id)) {
          state.profile.completedTutorialIds.push(tut.id);
          state.profile.completedQuizIds.push(tut.quiz.id);
          state.addXp(tut.xpReward, `Completed ${tut.title}`);
          renderTutorialSidebar();
        }
      } else {
        btn.classList.add('border-red-500/50', 'bg-red-950/20', 'text-red-300');
        feedback.className = 'p-3.5 rounded-xl text-xs space-y-1 bg-red-950/30 border border-red-500/40 text-red-200';
        feedback.innerHTML = `
          <div class="font-bold flex items-center gap-1.5">✕ Not quite.</div>
          <div class="text-[#8E92A4]">${tut.quiz.explanation}</div>
        `;
      }
      feedback.classList.remove('hidden');
    });
  });

  // Next Mission Handler
  const nextBtn = document.getElementById('btn-next-mission');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const curIndex = TUTORIALS.findIndex(t => t.id === state.activeTutorialId);
      if (curIndex < TUTORIALS.length - 1) {
        state.activeTutorialId = TUTORIALS[curIndex + 1].id;
        renderTutorialSidebar();
        renderActiveTutorial();
      } else {
        switchTab('studio');
        showToast('Curriculum completed! Now launch your GPU fine-tuning job in the Studio.');
      }
    });
  }
}

// TAB 2: TRAINING STUDIO LOGIC & SVG LOSS TELEMETRY
function initTrainingStudio() {
  const lrInput = document.getElementById('input-lr');
  const lrDisplay = document.getElementById('display-lr');
  const epochsInput = document.getElementById('input-epochs');
  const epochsDisplay = document.getElementById('display-epochs');
  const rankInput = document.getElementById('input-rank');
  const rankDisplay = document.getElementById('display-rank');
  const alphaInput = document.getElementById('input-alpha');
  const alphaDisplay = document.getElementById('display-alpha');
  const startBtn = document.getElementById('btn-start-training');

  if (lrInput && lrDisplay) {
    lrInput.addEventListener('input', () => {
      lrDisplay.textContent = (+lrInput.value).toExponential(1);
    });
  }

  if (epochsInput && epochsDisplay) {
    epochsInput.addEventListener('input', () => {
      epochsDisplay.textContent = epochsInput.value;
    });
  }

  if (rankInput && rankDisplay) {
    rankInput.addEventListener('change', () => {
      rankDisplay.textContent = rankInput.value;
      if (alphaInput && alphaDisplay) {
        alphaInput.value = parseInt(rankInput.value, 10) * 2;
        alphaDisplay.textContent = alphaInput.value;
      }
    });
  }

  if (alphaInput && alphaDisplay) {
    alphaInput.addEventListener('change', () => {
      alphaDisplay.textContent = alphaInput.value;
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', startTrainingSimulation);
  }

  const playgroundBtn = document.getElementById('btn-test-playground');
  if (playgroundBtn) {
    playgroundBtn.addEventListener('click', () => {
      openModal('modal-playground');
    });
  }

  const exportWeightsBtn = document.getElementById('btn-export-weights');
  if (exportWeightsBtn) {
    exportWeightsBtn.addEventListener('click', () => {
      const config = {
        base_model_name_or_path: document.getElementById('select-base-model').value,
        bias: 'none',
        fan_in_fan_out: false,
        lora_alpha: parseInt(document.getElementById('input-alpha').value, 10),
        lora_dropout: 0.05,
        modules_to_save: null,
        peft_type: 'LORA',
        r: parseInt(document.getElementById('input-rank').value, 10),
        target_modules: ['q_proj', 'v_proj', 'k_proj', 'o_proj'],
        task_type: 'CAUSAL_LM'
      };
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'adapter_config.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded adapter_config.json for Hugging Face!');
    });
  }
}

function startTrainingSimulation() {
  if (state.isTraining) return;

  if (state.profile.computeCredits < 50) {
    showToast('⚠️ Not enough compute credits! Verify student status for 1,000 free credits.');
    openModal('modal-verify');
    return;
  }

  state.profile.computeCredits -= 50;
  state.save();
  renderHeader();

  state.isTraining = true;
  state.currentTrainStep = 0;
  state.maxTrainSteps = 24;
  state.trainLossPoints = [];
  state.evalLossPoints = [];

  const startBtn = document.getElementById('btn-start-training');
  startBtn.disabled = true;
  startBtn.innerHTML = `
    <span class="inline-block w-4 h-4 border-2 border-[#090A0E] border-t-transparent rounded-full animate-spin"></span>
    <span>Fine-Tuning in Progress...</span>
  `;
  startBtn.classList.remove('btn-handshake-primary');
  startBtn.classList.add('bg-[#1E202B]', 'text-[#8E92A4]');

  const statusIndicator = document.getElementById('studio-status-indicator');
  const statusText = document.getElementById('studio-status-text');
  const terminal = document.getElementById('studio-terminal');
  const timerDisplay = document.getElementById('studio-timer');
  const completionActions = document.getElementById('studio-completion-actions');
  completionActions.classList.add('hidden');

  statusIndicator.className = 'w-2 h-2 rounded-full bg-[#D3FB52] animate-pulse';
  statusText.textContent = 'Cluster Active — Computing FP16 Gradients';

  terminal.innerHTML = `
    <div>[00:00:01] Allocating tensor buffers on NVIDIA A100-80GB (VRAM: 14.2 GB locked)...</div>
    <div>[00:00:02] Injecting LoRA low-rank adapter weights into q_proj and v_proj...</div>
    <div>[00:00:03] Streaming ChatML token batches with PyTorch DataLoader...</div>
  `;

  let seconds = 0;
  const timerInterval = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);

  let curTrain = 2.45;
  let curEval = 2.60;

  state.trainingInterval = setInterval(() => {
    state.currentTrainStep++;

    curTrain = +(curTrain * (0.91 + Math.random() * 0.05)).toFixed(3);
    curEval = +(curEval * (0.93 + Math.random() * 0.04)).toFixed(3);

    state.trainLossPoints.push(curTrain);
    state.evalLossPoints.push(curEval);

    // Update UI numbers
    document.getElementById('metric-step').textContent = `${state.currentTrainStep} / ${state.maxTrainSteps}`;
    document.getElementById('metric-train-loss').textContent = curTrain.toFixed(3);
    document.getElementById('metric-eval-loss').textContent = curEval.toFixed(3);
    document.getElementById('metric-vram').textContent = `${(14.2 + (state.currentTrainStep * 0.1)).toFixed(1)} GB`;

    // Append log line
    const logItem = document.createElement('div');
    logItem.textContent = `[Step ${state.currentTrainStep}/${state.maxTrainSteps}] loss: ${curTrain.toFixed(4)} | val_loss: ${curEval.toFixed(4)} | lr: 2.0e-4 | perplexity: ${Math.exp(curEval).toFixed(2)}`;
    terminal.appendChild(logItem);
    terminal.scrollTop = terminal.scrollHeight;

    // Render SVG polyline points
    renderLossChart(state.trainLossPoints, state.evalLossPoints, state.maxTrainSteps);

    if (state.currentTrainStep >= state.maxTrainSteps) {
      clearInterval(state.trainingInterval);
      clearInterval(timerInterval);
      state.isTraining = false;

      statusIndicator.className = 'w-2 h-2 rounded-full bg-emerald-400';
      statusText.textContent = 'Training Finished — Model Checkpoint Ready';

      startBtn.disabled = false;
      startBtn.innerHTML = `<span>⚡ Fine-Tune Another Model</span>`;
      startBtn.classList.add('btn-handshake-primary');
      startBtn.classList.remove('bg-[#1E202B]', 'text-[#8E92A4]');

      const modelSelect = document.getElementById('select-base-model');
      const datasetSelect = document.getElementById('select-dataset');
      const rankVal = document.getElementById('input-rank').value;

      const newModel = {
        id: `mod-${Date.now()}`,
        name: `${modelSelect.options[modelSelect.selectedIndex].text.split('(')[0].trim()}-LoRA-r${rankVal}`,
        baseModel: modelSelect.value,
        datasetName: datasetSelect.options[datasetSelect.selectedIndex].text.split('(')[0].trim(),
        finalTrainLoss: curTrain,
        finalEvalLoss: curEval,
        benchmarkScore: +(91 + Math.random() * 7).toFixed(1),
        createdAt: 'Just now'
      };

      state.trainedModels.unshift(newModel);
      state.profile.trainedModelIds.push(newModel.id);
      state.playgroundActiveModel = newModel;

      // Unlock badges
      if (!state.profile.unlockedBadgeIds.includes('badge-first-epoch')) {
        state.profile.unlockedBadgeIds.push('badge-first-epoch');
      }
      if (parseInt(rankVal, 10) >= 16 && !state.profile.unlockedBadgeIds.includes('badge-lora-pro')) {
        state.profile.unlockedBadgeIds.push('badge-lora-pro');
      }
      if (curEval < 0.6 && !state.profile.unlockedBadgeIds.includes('badge-loss-hero')) {
        state.profile.unlockedBadgeIds.push('badge-loss-hero');
      }

      state.addXp(150, 'GPU Fine-Tuning Job Complete');
      document.getElementById('checkpoint-desc-text').textContent = `Saved ${newModel.name} with validation loss ${curEval.toFixed(3)} and ${newModel.benchmarkScore}% benchmark score.`;
      completionActions.classList.remove('hidden');
    }
  }, 350);
}

function renderLossChart(trainPoints, evalPoints, totalSteps) {
  const polyTrain = document.getElementById('polyline-train-loss');
  const polyEval = document.getElementById('polyline-eval-loss');
  if (!polyTrain || !polyEval) return;

  const width = 500;
  const height = 160;
  const maxLoss = 3.0;

  const toCoords = (points) => {
    return points.map((val, idx) => {
      const x = (idx / (totalSteps - 1)) * width;
      const y = height - (Math.min(val, maxLoss) / maxLoss) * (height - 20) - 10;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  polyTrain.setAttribute('points', toCoords(trainPoints));
  polyEval.setAttribute('points', toCoords(evalPoints));
}

// TAB 3: PYTORCH CODE SANDBOX
function initCodeSandbox() {
  const editor = document.getElementById('sandbox-code-editor');
  const consoleEl = document.getElementById('sandbox-console');
  const runBtn = document.getElementById('btn-sandbox-run');
  const resetBtn = document.getElementById('btn-sandbox-reset');
  const filenameEl = document.getElementById('sandbox-filename');
  const statusEl = document.getElementById('sandbox-status');

  function loadTemplate(key) {
    state.activeSnippet = key;
    const tpl = CODE_TEMPLATES[key] || CODE_TEMPLATES.lora_peft;
    editor.value = tpl.code;
    filenameEl.textContent = tpl.fileName;
    consoleEl.innerHTML = `<div class="text-[#8E92A4]">// Click "Run Script" to execute code and test parameter tensor modifications...</div>`;
    statusEl.textContent = 'READY';
    statusEl.className = 'text-[10px] text-[#D3FB52] font-mono';
  }

  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.code-tab-btn').forEach(b => {
        b.classList.remove('active', 'text-[#D3FB52]', 'border-[#D3FB52]/30');
        b.classList.add('text-[#8E92A4]', 'border-[#232533]');
      });
      btn.classList.add('active', 'text-[#D3FB52]', 'border-[#D3FB52]/30');
      btn.classList.remove('text-[#8E92A4]', 'border-[#232533]');
      loadTemplate(btn.getAttribute('data-snippet'));
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      statusEl.textContent = 'RUNNING';
      statusEl.className = 'text-[10px] text-amber-400 font-mono animate-pulse';
      consoleEl.innerHTML = `<div class="text-white">$ python3 ${filenameEl.textContent}</div><div class="text-[#8E92A4]">Executing PyTorch autograd engine...</div>`;

      setTimeout(() => {
        const tpl = CODE_TEMPLATES[state.activeSnippet] || CODE_TEMPLATES.lora_peft;
        statusEl.textContent = 'SUCCESS (0)';
        statusEl.className = 'text-[10px] text-emerald-400 font-mono';

        consoleEl.innerHTML = `
          <div class="text-white">$ python3 ${filenameEl.textContent}</div>
          <div class="text-[#F3F4F6] whitespace-pre-wrap leading-relaxed">${tpl.stdout}</div>
        `;
        state.addXp(30, `Executed ${filenameEl.textContent}`);
      }, 600);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      loadTemplate(state.activeSnippet);
      showToast('Reset code script to template defaults.');
    });
  }

  loadTemplate('lora_peft');
}

// TAB 4: FELLOWSHIP & LEADERBOARD
function renderLeaderboard() {
  const podiumEl = document.getElementById('lb-podium-cards');
  const tableBody = document.getElementById('leaderboard-table-body');
  if (!podiumEl || !tableBody) return;

  const users = LEADERBOARD_USERS.map(u => {
    if (u.isCurrentUser) {
      return {
        ...u,
        name: `${state.profile.name} (You)`,
        university: state.profile.university,
        xp: state.profile.xp,
        models: state.trainedModels.length
      };
    }
    return u;
  }).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

  // Top 3 Podium
  podiumEl.innerHTML = `
    <!-- 2nd Place -->
    <div class="bg-[#12131A] border border-[#232533] rounded-2xl p-5 flex flex-col items-center text-center space-y-2 order-2 md:order-1">
      <div class="w-7 h-7 rounded-full bg-[#1E202B] text-[#8E92A4] font-bold text-xs flex items-center justify-center font-mono">2</div>
      <div class="w-14 h-14 rounded-2xl bg-[#1E202B] text-white font-bold flex items-center justify-center text-lg border border-[#34374A]">
        ${users[1].name.charAt(0)}
      </div>
      <div class="font-bold text-white text-sm">${users[1].name}</div>
      <div class="text-xs text-[#8E92A4]">${users[1].university}</div>
      <div class="text-xs font-mono font-bold text-[#D3FB52]">${users[1].xp.toLocaleString()} XP</div>
      <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">${users[1].status}</span>
    </div>

    <!-- 1st Place -->
    <div class="bg-[#12131A] border-2 border-[#D3FB52]/60 rounded-2xl p-6 flex flex-col items-center text-center space-y-2 order-1 md:order-2 shadow-xl glow-lime-subtle">
      <div class="w-8 h-8 rounded-full bg-[#D3FB52] text-[#090A0E] font-black text-sm flex items-center justify-center font-mono">1</div>
      <div class="w-16 h-16 rounded-2xl bg-[#D3FB52] text-[#090A0E] font-black flex items-center justify-center text-2xl shadow-lg">
        ${users[0].name.charAt(0)}
      </div>
      <div class="font-bold text-white text-base">${users[0].name}</div>
      <div class="text-xs text-[#8E92A4]">${users[0].university}</div>
      <div class="text-sm font-mono font-black text-[#D3FB52]">${users[0].xp.toLocaleString()} XP</div>
      <span class="text-[10px] text-[#D3FB52] bg-[#D3FB52]/10 px-2.5 py-0.5 rounded font-bold">${users[0].status}</span>
    </div>

    <!-- 3rd Place -->
    <div class="bg-[#12131A] border border-[#232533] rounded-2xl p-5 flex flex-col items-center text-center space-y-2 order-3">
      <div class="w-7 h-7 rounded-full bg-[#1E202B] text-[#8E92A4] font-bold text-xs flex items-center justify-center font-mono">3</div>
      <div class="w-14 h-14 rounded-2xl bg-[#1E202B] text-white font-bold flex items-center justify-center text-lg border border-[#34374A]">
        ${users[2].name.charAt(0)}
      </div>
      <div class="font-bold text-white text-sm">${users[2].name}</div>
      <div class="text-xs text-[#8E92A4]">${users[2].university}</div>
      <div class="text-xs font-mono font-bold text-[#D3FB52]">${users[2].xp.toLocaleString()} XP</div>
      <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">${users[2].status}</span>
    </div>
  `;

  // Full table
  tableBody.innerHTML = users.map(u => `
    <tr class="hover:bg-[#181924] transition-colors ${u.isCurrentUser ? 'bg-[#D3FB52]/5 font-semibold' : ''}">
      <td class="py-3 px-4 font-mono ${u.rank <= 3 ? 'text-[#D3FB52] font-bold' : 'text-[#8E92A4]'}">#${u.rank}</td>
      <td class="py-3 px-4 text-white font-medium flex items-center gap-2">
        <span class="w-6 h-6 rounded-lg bg-[#1E202B] text-xs flex items-center justify-center font-bold">${u.name.charAt(0)}</span>
        <span>${u.name}</span>
      </td>
      <td class="py-3 px-4 text-[#8E92A4]">${u.university}</td>
      <td class="py-3 px-4 font-mono">${u.models} models</td>
      <td class="py-3 px-4 font-mono text-[#D3FB52]">${u.accuracy}</td>
      <td class="py-3 px-4 font-mono font-bold">${u.xp.toLocaleString()}</td>
      <td class="py-3 px-4 text-right">
        <span class="text-[10px] px-2 py-0.5 rounded ${u.status.includes('Fellow') ? 'bg-[#D3FB52]/10 text-[#D3FB52] font-bold' : 'bg-[#1E202B] text-[#8E92A4]'}">${u.status}</span>
      </td>
    </tr>
  `).join('');

  const userRank = users.find(u => u.isCurrentUser)?.rank || 4;
  document.getElementById('lb-user-current-rank').textContent = `#${userRank} (Top 5%)`;
}

// TAB 5: STUDENT FORUMS
function initForums() {
  const newTopicBtn = document.getElementById('btn-new-topic');
  if (newTopicBtn) {
    newTopicBtn.addEventListener('click', () => openModal('modal-new-thread'));
  }

  const threadForm = document.getElementById('form-new-thread');
  if (threadForm) {
    threadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = document.getElementById('input-thread-category').value;
      const title = document.getElementById('input-thread-title').value.trim();
      const content = document.getElementById('input-thread-content').value.trim();

      if (!title || !content) return;

      const newThread = {
        id: `thread-${Date.now()}`,
        category: cat,
        title: title,
        author: state.profile.name,
        authorUni: state.profile.university.split(' ')[0],
        authorAvatar: state.profile.name.charAt(0),
        timeAgo: 'Just now',
        upvotes: 1,
        repliesCount: 0,
        body: content,
        replies: []
      };

      state.threads.unshift(newThread);
      state.save();
      closeModal('modal-new-thread');
      threadForm.reset();
      renderForum();
      state.addXp(20, 'Posted Discussion Thread');
    });
  }

  document.querySelectorAll('.forum-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.forum-cat-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#D3FB52]/10', 'text-[#D3FB52]', 'border-[#D3FB52]/30');
        b.classList.add('bg-[#12131A]', 'text-[#8E92A4]', 'border-[#232533]');
      });
      btn.classList.add('active', 'bg-[#D3FB52]/10', 'text-[#D3FB52]', 'border-[#D3FB52]/30');
      btn.classList.remove('bg-[#12131A]', 'text-[#8E92A4]', 'border-[#232533]');
      renderForum(btn.getAttribute('data-cat'));
    });
  });

  const searchInput = document.getElementById('forum-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderForum('all', searchInput.value.toLowerCase().trim());
    });
  }
}

function renderForum(selectedCat = 'all', searchQuery = '') {
  const container = document.getElementById('forum-threads-list');
  if (!container) return;

  let filtered = state.threads;
  if (selectedCat !== 'all') {
    filtered = filtered.filter(t => t.category === selectedCat);
  }
  if (searchQuery) {
    filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery) || t.body.toLowerCase().includes(searchQuery));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-[#12131A] border border-[#232533] rounded-2xl text-[#8E92A4] space-y-2">
        <div class="text-2xl">🔍</div>
        <div class="text-sm font-semibold text-white">No discussions match your filter</div>
        <div class="text-xs">Be the first student to start a thread on this topic!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(t => `
    <div class="p-4 rounded-2xl bg-[#12131A] border border-[#232533] hover:border-[#D3FB52]/40 transition-all cursor-pointer thread-card" data-thread-id="${t.id}">
      <div class="flex items-start justify-between gap-4">
        <div class="space-y-1.5 flex-1">
          <div class="flex items-center gap-2 text-[11px] text-[#8E92A4]">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E202B] text-white uppercase">${t.category}</span>
            <span>·</span>
            <span class="text-white font-medium">${t.author} (${t.authorUni})</span>
            <span>·</span>
            <span>${t.timeAgo}</span>
          </div>
          <h3 class="text-sm font-bold text-white leading-snug hover:text-[#D3FB52] transition-colors">${t.title}</h3>
          <p class="text-xs text-[#8E92A4] line-clamp-2">${t.body}</p>
        </div>

        <div class="flex items-center gap-3 text-xs text-[#8E92A4] whitespace-nowrap pt-1">
          <button class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#090A0E] border border-[#232533] hover:border-[#D3FB52]/40 transition-colors btn-upvote" data-thread-id="${t.id}">
            <span>▲</span>
            <span class="font-mono font-bold text-white tabular-nums">${t.upvotes}</span>
          </button>
          <div class="flex items-center gap-1 font-mono text-xs">
            <span>💬</span>
            <span>${t.repliesCount || t.replies?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Click on cards opens details
  container.querySelectorAll('.thread-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-upvote')) return;
      const threadId = card.getAttribute('data-thread-id');
      openThreadDetail(threadId);
    });
  });

  // Upvote button
  container.querySelectorAll('.btn-upvote').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const threadId = btn.getAttribute('data-thread-id');
      const thread = state.threads.find(t => t.id === threadId);
      if (thread) {
        thread.upvotes++;
        state.save();
        renderForum(selectedCat, searchQuery);
        showToast('Upvoted thread!');
      }
    });
  });
}

function openThreadDetail(threadId) {
  const thread = state.threads.find(t => t.id === threadId);
  if (!thread) return;

  document.getElementById('thread-detail-title').textContent = thread.title;
  const bodyEl = document.getElementById('thread-detail-body');

  bodyEl.innerHTML = `
    <!-- Original Post -->
    <div class="p-4 rounded-xl bg-[#090A0E] border border-[#232533] space-y-2">
      <div class="flex items-center justify-between text-xs text-[#8E92A4]">
        <span class="font-bold text-white">${thread.author} · ${thread.authorUni}</span>
        <span>${thread.timeAgo}</span>
      </div>
      <p class="text-xs text-[#F3F4F6] leading-relaxed whitespace-pre-wrap">${thread.body}</p>
    </div>

    <!-- Replies -->
    <div class="space-y-2.5">
      <div class="text-xs font-bold uppercase tracking-wider text-white">
        Replies & Solutions (${thread.replies ? thread.replies.length : 0})
      </div>
      ${(!thread.replies || thread.replies.length === 0) ? `
        <div class="text-xs text-[#8E92A4] p-3 text-center bg-[#090A0E] rounded-xl border border-[#232533]">
          No responses yet. Be the first peer to provide an answer!
        </div>
      ` : thread.replies.map(r => `
        <div class="p-3.5 rounded-xl bg-[#090A0E] border ${r.isAccepted ? 'border-[#D3FB52]/40 bg-[#D3FB52]/5' : 'border-[#232533]'} space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-white flex items-center gap-1.5">
              ${r.author} (${r.authorUni})
              ${r.isAccepted ? '<span class="text-[10px] text-[#D3FB52] font-bold">✓ Accepted Solution</span>' : ''}
            </span>
            <span class="text-[10px] text-[#8E92A4]">${r.timeAgo}</span>
          </div>
          <p class="text-xs text-[#9496A8] leading-relaxed">${r.text}</p>
        </div>
      `).join('')}
    </div>
  `;

  const replyBtn = document.getElementById('btn-submit-reply');
  replyBtn.onclick = () => {
    const input = document.getElementById('input-thread-reply');
    const val = input.value.trim();
    if (!val) return;

    if (!thread.replies) thread.replies = [];
    thread.replies.push({
      id: `rep-${Date.now()}`,
      author: state.profile.name,
      authorUni: state.profile.university.split(' ')[0],
      timeAgo: 'Just now',
      text: val,
      isAccepted: false
    });
    thread.repliesCount = thread.replies.length;
    state.save();
    input.value = '';
    openThreadDetail(threadId);
    state.addXp(15, 'Contributed Peer Reply');
  };

  openModal('modal-thread-detail');
}

// MODAL POPULATION HELPER
function populateVerifyForm() {
  const nameEl = document.getElementById('input-verify-name');
  const studentIdEl = document.getElementById('input-verify-studentid');
  const phoneEl = document.getElementById('input-verify-phone');
  const genderEl = document.getElementById('input-verify-gender');
  const dobEl = document.getElementById('input-verify-dob');
  const studentEmailEl = document.getElementById('input-verify-email');
  const altEmailEl = document.getElementById('input-verify-altemail');
  const formerEmailEl = document.getElementById('input-verify-formerschoolemail');
  const bankNameEl = document.getElementById('input-verify-bankname');

  if (nameEl) nameEl.value = state.profile.name || '';
  if (studentIdEl) studentIdEl.value = state.profile.studentId || '';
  if (phoneEl) phoneEl.value = state.profile.phone || '';
  if (genderEl) genderEl.value = state.profile.gender || '';
  if (dobEl) dobEl.value = state.profile.dob || '';
  if (studentEmailEl) studentEmailEl.value = state.profile.studentEmail || state.profile.email || '';
  if (altEmailEl) altEmailEl.value = state.profile.altEmail || '';
  if (formerEmailEl) formerEmailEl.value = state.profile.formerSchoolEmail || '';
  if (bankNameEl) bankNameEl.value = state.profile.bankName || '';
}

// TAB 6: STUDENT DASHBOARD / PORTFOLIO
function renderDashboard() {
  document.getElementById('profile-avatar-big').textContent = (state.profile.name || 'J').charAt(0);
  document.getElementById('profile-name-display').textContent = state.profile.name || 'John Doe';
  document.getElementById('profile-university-display').textContent = state.profile.university;
  document.getElementById('profile-major-display').textContent = state.profile.degree;
  document.getElementById('profile-level-badge').textContent = `Level ${state.profile.level}`;

  // Update Student Data Verification Record card
  const dashFullName = document.getElementById('dash-fullname');
  const dashStudentId = document.getElementById('dash-studentid');
  const dashPhone = document.getElementById('dash-phone');
  const dashGender = document.getElementById('dash-gender');
  const dashDob = document.getElementById('dash-dob');
  const dashStudentEmail = document.getElementById('dash-studentemail');
  const dashAltEmail = document.getElementById('dash-altemail');
  const dashFormerEmail = document.getElementById('dash-formerschoolemail');
  const dashBankName = document.getElementById('dash-bankname');

  if (dashFullName) dashFullName.textContent = state.profile.name || 'John Doe';
  if (dashStudentId) dashStudentId.textContent = state.profile.studentId || 'STU-2024-001';
  if (dashPhone) dashPhone.textContent = state.profile.phone || '+1 234 567 8900';
  if (dashGender) dashGender.textContent = state.profile.gender || 'Not specified';
  if (dashDob) dashDob.textContent = state.profile.dob || 'mm/dd/yyyy';
  if (dashStudentEmail) dashStudentEmail.textContent = state.profile.studentEmail || state.profile.email || 'student@university.edu';
  if (dashAltEmail) dashAltEmail.textContent = state.profile.altEmail || 'None provided';
  if (dashFormerEmail) dashFormerEmail.textContent = state.profile.formerSchoolEmail || 'None provided';
  if (dashBankName) {
    dashBankName.innerHTML = `<span>🏦</span> <span>${state.profile.bankName || 'Chase'}</span>`;
  }

  const dashCardStatus = document.getElementById('dash-card-status');
  const dashCardThumbnails = document.getElementById('dash-card-thumbnails');
  if (dashCardStatus) {
    if (state.profile.idCardFront && state.profile.idCardBack) {
      dashCardStatus.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      dashCardStatus.textContent = '✓ Verified by Faculty Review';
    } else {
      dashCardStatus.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30';
      dashCardStatus.textContent = '⏳ Pending ID Card Photos';
    }
  }
  if (dashCardThumbnails) {
    dashCardThumbnails.innerHTML = `
      <span class="px-2 py-0.5 rounded bg-[#12131A] border border-[#232533] ${state.profile.idCardFront ? 'text-emerald-400' : 'text-[#8E92A4]'}">Front: ${state.profile.idCardFront ? '✓ Attached' : 'Missing'}</span>
      <span class="px-2 py-0.5 rounded bg-[#12131A] border border-[#232533] ${state.profile.idCardBack ? 'text-emerald-400' : 'text-[#8E92A4]'}">Back: ${state.profile.idCardBack ? '✓ Attached' : 'Missing'}</span>
    `;
  }

  const currentLevelXp = (state.profile.level - 1) * 500;
  const progressInLevel = state.profile.xp - currentLevelXp;
  const percent = Math.min(100, Math.max(5, (progressInLevel / 500) * 100));

  document.getElementById('profile-xp-progress').textContent = `${progressInLevel} / 500 XP to Level ${state.profile.level + 1}`;
  document.getElementById('profile-xp-bar').style.width = `${percent}%`;

  document.getElementById('profile-credits-stat').textContent = state.profile.computeCredits.toLocaleString();
  document.getElementById('profile-tutorials-stat').textContent = `${state.profile.completedTutorialIds.length} / ${TUTORIALS.length}`;
  document.getElementById('profile-models-stat').textContent = state.trainedModels.length;
  document.getElementById('profile-streak-stat').textContent = `${state.profile.streakDays} Days`;

  // Render Checkpoints
  const checkpointsList = document.getElementById('profile-checkpoints-list');
  if (checkpointsList) {
    if (state.trainedModels.length === 0) {
      checkpointsList.innerHTML = `<div class="text-xs text-[#8E92A4] p-4 bg-[#090A0E] rounded-xl border border-[#232533]">No fine-tuned checkpoints yet. Head over to the Training Studio!</div>`;
    } else {
      checkpointsList.innerHTML = state.trainedModels.map(m => `
        <div class="p-3.5 rounded-xl bg-[#090A0E] border border-[#232533] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-xs font-mono">${m.name}</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D3FB52]/10 text-[#D3FB52]">LoRA Adapter</span>
            </div>
            <div class="text-[11px] text-[#8E92A4] mt-0.5">
              Trained on: ${m.datasetName} · Validation Loss: <span class="font-mono text-emerald-400 font-bold">${m.finalEvalLoss || 0.54}</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="text-[10px] text-[#8E92A4]">Benchmark Accuracy</div>
              <div class="text-xs font-bold font-mono text-[#D3FB52]">${m.benchmarkScore || 91.8}%</div>
            </div>
            <button onclick="openModal('modal-playground')" class="px-3 py-1.5 rounded-lg btn-handshake-primary text-xs font-bold cursor-pointer">
              Test
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Badges
  const badgesGrid = document.getElementById('profile-badges-grid');
  if (badgesGrid) {
    badgesGrid.innerHTML = BADGES.map(b => {
      const isUnlocked = state.profile.unlockedBadgeIds.includes(b.id);
      return `
        <div class="p-3.5 rounded-xl border ${isUnlocked ? 'bg-[#090A0E] border-[#D3FB52]/40 text-white' : 'bg-[#090A0E]/50 border-[#232533] text-[#8E92A4] opacity-50'} space-y-1">
          <div class="text-xl">${b.icon}</div>
          <div class="text-xs font-bold text-white">${b.name}</div>
          <div class="text-[11px] text-[#8E92A4] leading-tight">${b.description}</div>
        </div>
      `;
    }).join('');
  }

  // Update Task Earnings Ledger in Portfolio
  const totalEarningsEl = document.getElementById('profile-earnings-total');
  const pendingEarningsEl = document.getElementById('profile-earnings-pending');
  const tasksCountEl = document.getElementById('profile-tasks-count');
  const bankAccountEl = document.getElementById('profile-earnings-bank');
  const taskHistoryTbody = document.getElementById('profile-task-history-tbody');

  const totalPaid = typeof state.profile.taskEarningsTotal === 'number' ? state.profile.taskEarningsTotal : 0;
  const pendingPay = typeof state.profile.taskEarningsPending === 'number' ? state.profile.taskEarningsPending : 0;

  if (totalEarningsEl) totalEarningsEl.textContent = `$${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (pendingEarningsEl) pendingEarningsEl.textContent = `$${pendingPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (tasksCountEl) tasksCountEl.textContent = `${(state.profile.completedTasks || []).length} Tasks`;
  if (bankAccountEl) bankAccountEl.textContent = `🏦 ${state.profile.bankName || 'Chase'} · Verified`;

  if (taskHistoryTbody) {
    const list = state.profile.completedTasks || [];
    if (list.length === 0) {
      taskHistoryTbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-[#8E92A4]">No task history yet. Explore paid tasks above!</td></tr>`;
    } else {
      taskHistoryTbody.innerHTML = list.map(t => `
        <tr class="hover:bg-[#1A1C26]/40 transition-colors">
          <td class="py-2.5 px-3">
            <div class="font-bold text-white text-xs">${t.title}</div>
            <div class="text-[10px] text-[#8E92A4]">${t.category} · Mentor: ${t.mentor}</div>
          </td>
          <td class="py-2.5 px-3 font-mono text-[#D3FB52] font-semibold">$${t.hourlyRate}.00/hr</td>
          <td class="py-2.5 px-3 font-mono text-white">${t.hours} hrs</td>
          <td class="py-2.5 px-3 font-mono text-emerald-400 font-bold">$${t.payout.toFixed(2)}</td>
          <td class="py-2.5 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${t.status.includes('Deposited') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#D3FB52]/10 text-[#D3FB52] border border-[#D3FB52]/30'}">
              ${t.status}
            </span>
          </td>
        </tr>
      `).join('');
    }
  }

  // Export JSON portfolio
  const exportBtn = document.getElementById('btn-export-portfolio');
  if (exportBtn) {
    exportBtn.onclick = () => {
      const payload = {
        platform: 'Lupin AI',
        candidate: state.profile.name,
        studentId: state.profile.studentId,
        phone: state.profile.phone,
        gender: state.profile.gender,
        dob: state.profile.dob,
        studentEmail: state.profile.studentEmail,
        alternativeEmail: state.profile.altEmail,
        formerSchoolEmail: state.profile.formerSchoolEmail,
        bankName: state.profile.bankName,
        idCardFrontAttached: Boolean(state.profile.idCardFront),
        idCardBackAttached: Boolean(state.profile.idCardBack),
        directDepositVerified: true,
        totalEarningsToDate: state.profile.taskEarningsTotal,
        pendingEarningsThisFriday: state.profile.taskEarningsPending,
        university: state.profile.university,
        degree: state.profile.degree,
        verifiedStudent: state.profile.isVerifiedStudent,
        lupinAiLevel: state.profile.level,
        xp: state.profile.xp,
        computeCredits: state.profile.computeCredits,
        completedTasks: state.profile.completedTasks,
        trainedModelCheckpoints: state.trainedModels,
        missionsCompleted: state.profile.completedTutorialIds
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Lupin_AI_Student_Data_${state.profile.name.replace(/\s+/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported verified Student Data & AI Portfolio JSON!');
    };
  }

  const editProfileBtn = document.getElementById('btn-edit-student-profile');
  if (editProfileBtn) {
    editProfileBtn.onclick = () => openModal('modal-verify');
  }
}

// ================= TAB: PAID TASKS & RATES =================
let currentTaskCategory = 'all';
let currentPriceMode = 'both'; // 'both', 'hourly', 'weekly'
let currentSearchQuery = '';
let activeTaskForModal = null;

function updateEarningsCalc() {
  const slider = document.getElementById('calc-hours-slider');
  const rateSelect = document.getElementById('calc-rate-select');
  const hoursDisplay = document.getElementById('calc-hours-display');
  const hourlyDisplay = document.getElementById('calc-stat-hourly');
  const weeklyDisplay = document.getElementById('calc-stat-weekly');
  const monthlyDisplay = document.getElementById('calc-stat-monthly');
  const bankDisplay = document.getElementById('calc-bank-display');

  const hours = slider ? parseInt(slider.value, 10) : 20;
  const rate = rateSelect ? parseInt(rateSelect.value, 10) : 60;

  if (hoursDisplay) hoursDisplay.textContent = `${hours} hrs / week`;
  if (hourlyDisplay) hourlyDisplay.textContent = `$${rate}.00 / hr`;
  
  const weeklyTotal = hours * rate;
  const monthlyTotal = weeklyTotal * 4;

  if (weeklyDisplay) {
    weeklyDisplay.textContent = `$${weeklyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (monthlyDisplay) {
    monthlyDisplay.textContent = `$${monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (bankDisplay) {
    bankDisplay.textContent = `${state.profile.bankName || 'Chase'} · Verified`;
  }
}

function renderTasks() {
  const container = document.getElementById('tasks-grid-container');
  if (!container) return;

  const filtered = TASKS.filter(task => {
    const matchesCat = currentTaskCategory === 'all' || task.category === currentTaskCategory;
    const query = currentSearchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      task.title.toLowerCase().includes(query) ||
      task.summary.toLowerCase().includes(query) ||
      task.mentor.toLowerCase().includes(query) ||
      task.categoryLabel.toLowerCase().includes(query) ||
      task.requiredSkills.some(s => s.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-[#12131A] rounded-2xl border border-[#232533] space-y-2">
        <span class="text-2xl">🔍</span>
        <div class="text-sm font-bold text-white">No tasks match your search</div>
        <p class="text-xs text-[#8E92A4]">Try clearing your search query or selecting "All Disciplines".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(t => {
    let rateBadgeHtml = '';
    if (currentPriceMode === 'both') {
      rateBadgeHtml = `
        <div class="space-y-0.5">
          <div class="flex items-baseline justify-between">
            <span class="text-[10px] uppercase font-bold text-[#8E92A4]">Hourly Rate</span>
            <span class="text-base font-extrabold text-[#D3FB52] font-mono tabular-nums">$${t.hourlyRate}.00 / hr</span>
          </div>
          <div class="flex items-baseline justify-between">
            <span class="text-[10px] uppercase font-bold text-[#8E92A4]">Weekly Estimate (20–40h)</span>
            <span class="text-xs font-bold text-white font-mono tabular-nums">$${t.weeklyMin.toLocaleString()} – $${t.weeklyMax.toLocaleString()} / wk</span>
          </div>
        </div>
      `;
    } else if (currentPriceMode === 'hourly') {
      rateBadgeHtml = `
        <div class="flex items-baseline justify-between">
          <span class="text-[10px] uppercase font-bold text-[#8E92A4]">Hourly Rate</span>
          <span class="text-lg font-extrabold text-[#D3FB52] font-mono tabular-nums">$${t.hourlyRate}.00 / hr</span>
        </div>
      `;
    } else {
      rateBadgeHtml = `
        <div class="flex items-baseline justify-between">
          <span class="text-[10px] uppercase font-bold text-[#8E92A4]">Weekly Estimate</span>
          <span class="text-base font-extrabold text-white font-mono tabular-nums">$${t.weeklyMin.toLocaleString()} – $${t.weeklyMax.toLocaleString()} / wk</span>
        </div>
      `;
    }

    return `
      <div class="bg-[#12131A] border border-[#232533] hover:border-[#D3FB52]/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-lg hover:shadow-[#D3FB52]/5">
        <div class="space-y-3.5">
          <!-- Card Top Meta -->
          <div class="flex items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D3FB52]/10 text-[#D3FB52] border border-[#D3FB52]/30">
                ${t.categoryLabel}
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1A1C26] text-[#8E92A4] border border-[#232533]">
                ${t.difficulty}
              </span>
            </div>
            <span class="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ${t.openings} open slots
            </span>
          </div>

          <!-- Title & Mentor -->
          <div>
            <h3 class="text-base font-bold text-white group-hover:text-[#D3FB52] transition-colors tracking-tight">
              ${t.title}
            </h3>
            <p class="text-xs text-[#8E92A4] mt-1 flex items-center gap-1.5">
              <span>👩‍🔬</span>
              <span>Mentor: <strong class="text-[#C5C8D8] font-medium">${t.mentor}</strong></span>
            </p>
          </div>

          <!-- Pricing Pill Box -->
          <div class="p-3 bg-[#090A0E] rounded-xl border border-[#232533] space-y-1">
            ${rateBadgeHtml}
          </div>

          <!-- Summary -->
          <p class="text-xs text-[#9496A8] leading-relaxed line-clamp-3">
            ${t.summary}
          </p>

          <!-- Skills tags -->
          <div class="flex items-center gap-1.5 flex-wrap pt-1">
            <span class="text-[10px] font-mono text-[#8E92A4]">${t.timeEstimate}</span>
            <span class="text-[#5A5E73]">·</span>
            ${t.requiredSkills.map(s => `
              <span class="px-2 py-0.5 rounded text-[10px] bg-[#1A1C26] text-[#C5C8D8] border border-[#232533] font-mono">
                ${s}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Card Action Footer -->
        <div class="pt-4 mt-4 border-t border-[#232533] flex items-center justify-between gap-3">
          <div class="text-[10px] text-[#8E92A4] flex items-center gap-1 truncate">
            <span>🏦</span>
            <span class="truncate">Deposit to: <strong class="text-white">${state.profile.bankName || 'Chase'}</strong></span>
          </div>
          <button
            onclick="openTaskModal('${t.id}')"
            class="px-3.5 py-2 rounded-xl btn-handshake-primary font-bold text-xs cursor-pointer transition-transform active:scale-[0.98] whitespace-nowrap"
          >
            View Rubric &amp; Submit &rarr;
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.openTaskModal = function(taskId) {
  const task = TASKS.find(t => t.id === taskId);
  if (!task) return;
  activeTaskForModal = task;

  const modalCat = document.getElementById('task-modal-category');
  const modalDiff = document.getElementById('task-modal-difficulty');
  const modalTitle = document.getElementById('task-modal-title');
  const modalMentor = document.getElementById('task-modal-mentor');
  const modalHourly = document.getElementById('task-modal-rate-hourly');
  const modalWeekly = document.getElementById('task-modal-rate-weekly');
  const modalBankStatus = document.getElementById('task-modal-bank-status');
  const modalBankIndicator = document.getElementById('task-modal-bank-indicator');
  const modalDesc = document.getElementById('task-modal-description');
  const inputHours = document.getElementById('input-task-hours');
  const calcPayout = document.getElementById('task-modal-calculated-payout');

  if (modalCat) modalCat.textContent = task.categoryLabel;
  if (modalDiff) modalDiff.textContent = task.difficulty;
  if (modalTitle) modalTitle.textContent = task.title;
  if (modalMentor) modalMentor.textContent = `Supervised by ${task.mentor}`;
  if (modalHourly) modalHourly.textContent = `$${task.hourlyRate}.00 / hr`;
  if (modalWeekly) modalWeekly.textContent = `$${task.weeklyMin.toLocaleString()} – $${task.weeklyMax.toLocaleString()} / wk`;
  if (modalBankStatus) modalBankStatus.textContent = `${state.profile.bankName || 'Chase'} Friday Deposit`;
  if (modalBankIndicator) modalBankIndicator.textContent = `${state.profile.bankName || 'Chase'} account`;
  if (modalDesc) modalDesc.innerHTML = task.rubric;

  const defaultHours = 4;
  if (inputHours) {
    inputHours.value = defaultHours;
    inputHours.oninput = () => {
      const h = Math.max(1, Math.min(40, parseInt(inputHours.value, 10) || 1));
      if (calcPayout) {
        calcPayout.textContent = `$${(h * task.hourlyRate).toFixed(2)}`;
      }
    };
  }
  if (calcPayout) {
    calcPayout.textContent = `$${(defaultHours * task.hourlyRate).toFixed(2)}`;
  }

  openModal('modal-task-detail');
};

function initTaskEvents() {
  // Calculator hours slider
  const slider = document.getElementById('calc-hours-slider');
  if (slider) {
    slider.addEventListener('input', updateEarningsCalc);
  }

  // Calculator rate select
  const rateSelect = document.getElementById('calc-rate-select');
  if (rateSelect) {
    rateSelect.addEventListener('change', updateEarningsCalc);
  }

  // Category filter tabs
  const catButtons = document.querySelectorAll('.task-cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#D3FB52]/10', 'text-[#D3FB52]', 'border-[#D3FB52]/30');
        b.classList.add('text-[#8E92A4]', 'border-[#232533]');
      });
      btn.classList.add('active', 'bg-[#D3FB52]/10', 'text-[#D3FB52]', 'border-[#D3FB52]/30');
      btn.classList.remove('text-[#8E92A4]', 'border-[#232533]');
      currentTaskCategory = btn.getAttribute('data-task-cat');
      renderTasks();
    });
  });

  // Rate view switcher
  const viewBoth = document.getElementById('btn-rate-view-both');
  const viewHourly = document.getElementById('btn-rate-view-hourly');
  const viewWeekly = document.getElementById('btn-rate-view-weekly');
  const viewButtons = [viewBoth, viewHourly, viewWeekly].filter(Boolean);

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#12131A]', 'text-white', 'border-[#D3FB52]/30');
        b.classList.add('text-[#8E92A4]');
      });
      btn.classList.add('active', 'bg-[#12131A]', 'text-white', 'border-[#D3FB52]/30');
      btn.classList.remove('text-[#8E92A4]');
      currentPriceMode = btn.getAttribute('data-rate-view');
      renderTasks();
    });
  });

  // Search input
  const searchInput = document.getElementById('task-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderTasks();
    });
  }

  // Task Deliverable Submission Form
  const taskSubmitForm = document.getElementById('form-submit-task');
  if (taskSubmitForm) {
    taskSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!activeTaskForModal) return;

      const url = document.getElementById('input-task-url').value.trim();
      const hours = parseInt(document.getElementById('input-task-hours').value, 10) || 4;
      const notes = document.getElementById('input-task-notes').value.trim();

      const payout = hours * activeTaskForModal.hourlyRate;

      // Add to student profile
      if (!state.profile.completedTasks) state.profile.completedTasks = [];
      state.profile.completedTasks.unshift({
        id: 'task-sub-' + Date.now(),
        title: activeTaskForModal.title,
        category: activeTaskForModal.categoryLabel,
        hourlyRate: activeTaskForModal.hourlyRate,
        hours: hours,
        payout: payout,
        mentor: activeTaskForModal.mentor,
        status: 'In Graduate Review',
        date: 'Just now',
        deliverableUrl: url,
        reviewerNotes: notes
      });

      state.profile.taskEarningsPending = (state.profile.taskEarningsPending || 0) + payout;
      state.addXp(100, `Submitted deliverable for ${activeTaskForModal.title}`);

      state.save();
      closeModal('modal-task-detail');
      taskSubmitForm.reset();

      renderDashboard();
      renderTasks();
      updateEarningsCalc();

      showToast(`🎉 Work submitted! +$${payout.toFixed(2)} added to pending Friday direct deposit for ${state.profile.bankName}.`);
    });
  }

  // Initial render
  updateEarningsCalc();
  renderTasks();
}

// MODAL CONTROLS
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    if (modalId === 'modal-verify') {
      populateVerifyForm();
    }
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
};

function initModals() {
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal');
      closeModal(target);
    });
  });

  // Front and Back Student ID Card File Upload & Live Preview
  let uploadedFrontBase64 = null;
  let uploadedBackBase64 = null;

  const frontInput = document.getElementById('input-id-front-file');
  const backInput = document.getElementById('input-id-back-file');
  const frontPreview = document.getElementById('img-front-preview');
  const backPreview = document.getElementById('img-back-preview');
  const frontPlaceholder = document.getElementById('front-placeholder-content');
  const backPlaceholder = document.getElementById('back-placeholder-content');
  const frontPreviewContainer = document.getElementById('front-preview-container');
  const backPreviewContainer = document.getElementById('back-preview-container');
  const frontBadge = document.getElementById('badge-front-uploaded');
  const backBadge = document.getElementById('badge-back-uploaded');

  function handleFileRead(file, isFront) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please upload an image file (JPG, PNG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target.result;
      if (isFront) {
        uploadedFrontBase64 = result;
        if (frontPreview) frontPreview.src = result;
        if (frontPlaceholder) frontPlaceholder.classList.add('hidden');
        if (frontPreviewContainer) frontPreviewContainer.classList.remove('hidden');
        if (frontBadge) frontBadge.classList.remove('hidden');
        showToast('✓ Front of Student ID loaded');
      } else {
        uploadedBackBase64 = result;
        if (backPreview) backPreview.src = result;
        if (backPlaceholder) backPlaceholder.classList.add('hidden');
        if (backPreviewContainer) backPreviewContainer.classList.remove('hidden');
        if (backBadge) backBadge.classList.remove('hidden');
        showToast('✓ Back of Student ID loaded');
      }
    };
    reader.readAsDataURL(file);
  }

  if (frontInput) {
    frontInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileRead(e.target.files[0], true);
      }
    });
  }

  if (backInput) {
    backInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileRead(e.target.files[0], false);
      }
    });
  }

  // Student Data Verification & Training Portal Form
  const verifyForm = document.getElementById('form-verify-student');
  if (verifyForm) {
    verifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('input-verify-name').value.trim();
      const studentId = document.getElementById('input-verify-studentid').value.trim();
      const phone = document.getElementById('input-verify-phone').value.trim();
      const gender = document.getElementById('input-verify-gender').value;
      const dob = document.getElementById('input-verify-dob').value;
      const studentEmail = document.getElementById('input-verify-email').value.trim();
      const altEmail = document.getElementById('input-verify-altemail').value.trim();
      const formerEmail = document.getElementById('input-verify-formerschoolemail').value.trim();
      const bankName = document.getElementById('input-verify-bankname').value.trim();

      state.profile.name = name || 'John Doe';
      state.profile.studentId = studentId || 'STU-2024-001';
      state.profile.phone = phone || '+1 234 567 8900';
      state.profile.gender = gender || 'Prefer not to say';
      state.profile.dob = dob || '';
      state.profile.studentEmail = studentEmail || 'student@university.edu';
      state.profile.email = state.profile.studentEmail;
      state.profile.altEmail = altEmail;
      state.profile.formerSchoolEmail = formerEmail;
      state.profile.bankName = bankName || 'Chase';
      state.profile.isVerifiedStudent = true;

      if (uploadedFrontBase64) state.profile.idCardFront = uploadedFrontBase64;
      if (uploadedBackBase64) state.profile.idCardBack = uploadedBackBase64;

      // Extract institutional university if applicable
      if (studentEmail && studentEmail.includes('@')) {
        const domain = studentEmail.split('@')[1].toLowerCase();
        if (domain.includes('stanford')) state.profile.university = 'Stanford University';
        else if (domain.includes('mit')) state.profile.university = 'Massachusetts Institute of Technology';
        else if (domain.includes('berkeley')) state.profile.university = 'UC Berkeley';
        else if (domain.includes('cmu')) state.profile.university = 'Carnegie Mellon University';
        else if (domain.includes('harvard')) state.profile.university = 'Harvard University';
        else if (domain.includes('oxford')) state.profile.university = 'Oxford University';
        else if (domain.includes('toronto')) state.profile.university = 'University of Toronto';
        else if (domain.includes('ethz')) state.profile.university = 'ETH Zürich';
      }

      state.profile.computeCredits = Math.max(state.profile.computeCredits, 1000);

      if (!state.profile.unlockedBadgeIds.includes('badge-verified-scholar')) {
        state.profile.unlockedBadgeIds.push('badge-verified-scholar');
      }

      state.save();
      closeModal('modal-verify');
      renderHeader();
      renderDashboard();
      renderTasks();
      updateEarningsCalc();
      showToast('🎉 Student Data Submitted! Identity verified and fellowship direct deposit profile active.');
    });
  }

  // Playground Inference Runner
  const runInferenceBtn = document.getElementById('btn-run-inference');
  if (runInferenceBtn) {
    runInferenceBtn.addEventListener('click', () => {
      const prompt = document.getElementById('playground-prompt-input').value.trim();
      const baseOut = document.getElementById('playground-base-output');
      const loraOut = document.getElementById('playground-lora-output');

      baseOut.textContent = 'Generating base foundation output...';
      loraOut.textContent = 'Running inference with student LoRA adapter weights...';

      setTimeout(() => {
        if (prompt.toLowerCase().includes('metformin') || prompt.toLowerCase().includes('renal')) {
          baseOut.textContent = 'Metformin is prescribed for type 2 diabetes. Patients with kidney complications are usually monitored because acids can build up. Consult your healthcare provider.';
          loraOut.textContent = 'Metformin is contraindicated in severe renal impairment (eGFR < 30 mL/min/1.73m²) primarily due to the risk of Metformin-Associated Lactic Acidosis (MALA). Because metformin is excreted renally unchanged via organic cation transporters (OCT2/MATE1), impaired filtration causes systemic drug accumulation and inhibition of hepatic mitochondrial complex I.';
        } else {
          baseOut.textContent = `General response from pre-trained base model for prompt: "${prompt}". This output lacks targeted fine-tuning alignment.`;
          loraOut.textContent = `Specialized high-precision response from your fine-tuned LoRA adapter checkpoint on "${prompt}". Formatted with domain reasoning and strict instruction adherence.`;
        }
      }, 500);
    });
  }
}

// INITIALIZATION ENTRY POINT
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  initNavigation();
  initTutorials();
  initTrainingStudio();
  initCodeSandbox();
  initForums();
  initTaskEvents();
  initModals();
});
