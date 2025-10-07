// DNA Analysis Knowledge Base
// Organized by 7 categories matching the solar system planets

const KNOWLEDGE_BASE = {
  
  // ============================================
  // CATEGORY 1: SLEEP (Circadian Rhythm & Rest)
  // ============================================
  
  rs1801260: {
    category: "sleep",
    name: "CLOCK - Circadian Rhythm Type (Morning Person vs Night Owl)",
    genotypes: {
      "AA": "Morning person (lark)! You naturally wake early and feel most alert in the mornings. Your circadian clock runs slightly faster than 24 hours. Early to bed, early to rise. Peak productivity before noon. Evening tasks may be harder. The A/A genotype is associated with earlier sleep timing and morning preference.",
      "AT": "Moderate chronotype. Flexible sleep-wake timing - can adapt to different schedules somewhat easily. Not strongly morning or evening oriented. Most adaptable for shift work or travel.",
      "TT": "Evening person (night owl). The T variant is associated with later sleep timing and staying up late naturally. Feel more alert and productive in evenings and nights. Struggle with early mornings. May have delayed sleep phase. Your circadian rhythm naturally runs longer than 24 hours."
    }
  },
  
  rs10830963: {
    category: "sleep",
    name: "MTNR1B - Melatonin Receptor & Sleep Timing",
    genotypes: {
      "CC": "Normal melatonin receptor function. Typical melatonin signaling for sleep-wake cycle regulation. Standard response to darkness and light cues for sleep.",
      "CG": "One copy of variant affecting melatonin receptor. Slight alterations in melatonin signaling, sleep timing, and glucose regulation (melatonin affects insulin too).",
      "GG": "Altered melatonin receptor sensitivity. May have different natural sleep patterns and timing. The G variant is associated with higher fasting glucose levels (melatonin and insulin interact). May benefit from consistent sleep schedule."
    }
  },
  
  rs73598374: {
    category: "sleep",
    name: "ADA - Deep Sleep & Slow Wave Sleep",
    genotypes: {
      "CC": "Typical deep sleep patterns and slow-wave sleep. May function well on slightly less total sleep. More efficient sleep architecture - get adequate rest without needing excessive hours.",
      "CT": "Moderate deep sleep profile. Average slow-wave sleep duration and typical total sleep needs (~7-8 hours).",
      "TT": "More deep sleep and slow-wave sleep. You may need more total sleep to feel fully rested (~8-9 hours). Spend longer in restorative deep sleep stages. May be harder to wake up and may feel groggy if sleep is interrupted during deep sleep phases."
    }
  },

  rs10506084: {
    category: "sleep",
    name: "Sleep Duration Needs",
    genotypes: {
      "TT": "May naturally need slightly less sleep. Some people with this variant function well on 6-7 hours, though individual variation is large.",
      "CT": "Average sleep needs. Most people need 7-9 hours for optimal function.",
      "CC": "May need more sleep for optimal functioning. Likely feel best with 8-9 hours of quality sleep."
    }
  },
  
  // ============================================
  // CATEGORY 2: MIND (Cognitive & Personality)
  // ============================================
  
  rs4680: {
    category: "mind",
    name: "COMT - Warrior/Worrier Gene",
    genotypes: {
      "GG": "Warrior variant (Val/Val). Fast dopamine clearance in prefrontal cortex means you handle stress exceptionally well and think clearly under pressure. Thrive in chaos and high-stakes situations. May need more stimulation for detailed memory tasks. Better at 'thinking on your feet' than prolonged focus.",
      "AG": "The Goldilocks genotype! Balanced warrior-worrier. You get excellent memory AND good stress performance. Cognitive flexibility - can focus deeply on details but also adapt quickly under pressure. This heterozygous state is considered optimal - best of both worlds.",
      "AA": "Worrier variant (Met/Met). Slower dopamine breakdown means superior memory, attention to detail, and sustained focus - but more sensitive to stress and anxiety. Excel in calm, structured environments. Better at planning and analysis than crisis response. May ruminate more."
    }
  },
  
  rs53576: {
    category: "mind",
    name: "OXTR - The Empathy & Social Connection Gene",
    genotypes: {
      "GG": "Super empathy variant! You're naturally attuned to others' emotions, excel at reading social cues and facial expressions, and are likely very caring in relationships. More prosocial behavior - studies show GG individuals are more generous, charitable, and trusting. Seek social connection strongly. More affected by social rejection but also more emotionally supportive. Better parent/partner on average.",
      "AG": "Moderate empathy. You read emotions well without being overwhelmed by them. Balanced social sensitivity and emotional resilience. Good at relationships but maintain healthy boundaries.",
      "AA": "Lower empathy variant. More analytical than emotional in social situations. Less swayed by others' moods and emotions. May be more independent in decision-making. Better at maintaining objectivity in emotionally charged situations."
    }
  },
  
  rs6295: {
    category: "mind",
    name: "HTR1A - Serotonin Receptor & Depression/Anxiety Risk",
    genotypes: {
      "GG": "Protective variant. Lower depression and anxiety risk. The G allele is associated with better stress resilience, mood stability, and lower neuroticism. Better baseline emotional regulation.",
      "CG": "Moderate anxiety tendency. Mixed profile for stress response and mood regulation. You may be a thoughtful worrier - careful about risks but not overwhelmed.",
      "CC": "Higher susceptibility to depression and anxiety. The C variant is associated with increased worry, rumination, and anxiety sensitivity. Doesn't mean you will be depressed - just a predisposition. May benefit more from stress management, therapy, mindfulness. Often paired with conscientiousness and attention to detail."
    }
  },
  
  rs324420: {
    category: "mind",
    name: "FAAH - The 'Bliss Gene' (Anandamide)",
    genotypes: {
      "AA": "The 'worry-free' variant! Lower FAAH enzyme activity means higher levels of anandamide - your brain's natural 'bliss' molecule (similar to THC). Associated with: significantly lower anxiety, reduced fear of negative outcomes, faster forgetting of negative experiences, higher pain threshold, more optimistic outlook. May seem unflappable to others.",
      "AC": "Moderate anxiety levels. One copy of low-FAAH variant provides some stress buffering. Mixed profile for fear response and memory of negative events.",
      "CC": "Normal FAAH activity and anandamide levels. Typical anxiety, stress response, and pain sensitivity. You experience the full range of worry and caution that helped humans survive - being alert to threats is adaptive even if uncomfortable."
    }
  },
  
  rs6265: {
    category: "mind",
    name: "BDNF - Brain-Derived Neurotrophic Factor (Memory & Learning)",
    genotypes: {
      "CC": "Val/Val variant. Better memory consolidation and learning, especially in low-stress situations. Good at forming new memories and retaining information in calm environments.",
      "CT": "Val/Met mixed. Better working memory and focused attention, but more affected by stress. May be more prone to anxiety but cognitively sharper in stable conditions. The Met allele is associated with more efficient prefrontal cortex function.",
      "TT": "Met/Met variant. Enhanced short-term memory and executive function in stable environments, but cognitive performance suffers more under stress. May have more anxiety but superior focus when calm."
    }
  },
  
  rs1800497: {
    category: "mind",
    name: "DRD2 - Dopamine Receptor Density (Novelty-Seeking)",
    genotypes: {
      "TT": "A1/A1 variant. Lower dopamine receptor density (~30% fewer D2 receptors). Associated with higher novelty-seeking, risk-taking, impulsivity, and reward-seeking behavior. May need more stimulation to feel satisfied. Higher susceptibility to addictive behaviors (substances, gambling). Drawn to new experiences.",
      "GT": "A1 carrier (A1/A2). Moderate dopamine receptor density. Some novelty-seeking tendency but not extreme. Balanced between routine and variety.",
      "GG": "A2/A2 variant. Normal/higher dopamine receptor density. Less novelty-seeking - prefer familiar experiences and routines. More satisfied with predictability. Lower addiction risk. May be more detail-oriented and careful in decisions."
    }
  },
  
  rs1799971: {
    category: "mind",
    name: "OPRM1 - Opioid Receptor (Pain Response & Reward)",
    genotypes: {
      "GG": "Asn40Asp variant. Altered mu-opioid receptor. May need higher doses of opioid pain medications for relief. Different pain sensitivity - possibly higher pain threshold. May have different reward responses to pleasurable activities.",
      "AG": "One copy of Asn40Asp variant. Moderate alterations in opioid response and pain sensitivity. Some effect on medication requirements.",
      "AA": "Normal mu-opioid receptor function. Typical response to opioid pain medications and standard pain sensitivity. The most common variant."
    }
  },

  rs1799913: {
    category: "mind",
    name: "DRD2 - Dopamine Receptor (Reward Processing)",
    genotypes: {
      "GG": "Typical dopamine-mediated reward processing. Standard response to pleasurable stimuli and rewards.",
      "GT": "Heterozygous for reward processing variant. Moderate effects on how your brain processes rewards and motivation.",
      "TT": "Variant affecting reward pathway. May influence motivation, pleasure response, and reinforcement learning."
    }
  },
  
  // ============================================
  // CATEGORY 3: PERFORMANCE (Athletic & Physical)
  // ============================================
  
  rs1815739: {
    category: "performance",
    name: "ACTN3 - The Sprint Gene (Muscle Fiber Type)",
    genotypes: {
      "CC": "Sprint/power variant (R/R). You produce alpha-actinin-3 protein in fast-twitch muscle fibers. Better explosive power, speed, strength, and sprinting ability. Common in elite sprinters, jumpers, and power athletes. Your muscles are built for short, intense bursts.",
      "CT": "All-rounder! You have BOTH fast-twitch (C) and enhanced endurance (T). Most versatile athletic genotype - can excel in various sports from sprinting to distance running. Your muscles adapt well to whatever training you pursue. Neither specialist nor limited.",
      "TT": "Endurance variant (X/X). No alpha-actinin-3 protein - but this ENHANCES endurance and recovery! More efficient slow-twitch muscles, better oxygen utilization, faster recovery from fatigue. Over-represented in elite marathoners, cyclists, and endurance athletes. Your muscles are built for sustained effort."
    }
  },
  
  rs8192678: {
    category: "performance",
    name: "PPARGC1A - Endurance Master Gene (Mitochondrial Function)",
    genotypes: {
      "TT": "Elite endurance variant (Gly/Gly). Enhanced mitochondrial biogenesis, superior aerobic capacity, and exceptional endurance potential. Over-represented in Olympic endurance athletes. Your cells are power plants - excellent at sustained energy production.",
      "CT": "One copy of endurance-enhancing variant (Gly/Ser). Moderate boost to aerobic fitness and endurance training response. Better than average but not elite.",
      "CC": "Common variant (Ser/Ser). Typical aerobic capacity and mitochondrial function. Standard training response - still can achieve great fitness with proper training."
    }
  },
  
  rs4994: {
    category: "performance",
    name: "GNB3 - Endurance Capacity & Training Response",
    genotypes: {
      "AA": "Associated with better endurance performance and sustained physical activity. May respond more favorably to aerobic/cardio training. Good for distance sports.",
      "AG": "Mixed profile for endurance vs power training response. Adaptable to various training types.",
      "GG": "May favor power and strength activities over pure endurance. Could respond better to resistance training and high-intensity intervals."
    }
  },
  
  rs1800012: {
    category: "performance",
    name: "COL1A1 - Tendon & Ligament Strength (Injury Risk)",
    genotypes: {
      "GG": "Stronger, more resilient collagen (Sp1 genotype). Significantly lower risk of soft tissue injuries: ACL tears, Achilles ruptures, tennis elbow, rotator cuff issues. Your tendons and ligaments are more robust. Can handle higher training loads safely.",
      "GT": "Moderate collagen strength. Slightly elevated soft tissue injury risk compared to GG. Should prioritize proper warm-up, gradual training progression, and not overtrain. Still can be very athletic with good habits.",
      "TT": "Weaker collagen variant. Higher risk of overuse injuries, ligament/tendon damage, and stress fractures. Need extra attention to injury prevention: thorough warm-ups, mobility work, gradual intensity increases, adequate recovery. Many elite athletes have this - it's manageable with smart training."
    }
  },
  
  rs699: {
    category: "performance",
    name: "AGT - Blood Pressure Regulation & Endurance Response",
    genotypes: {
      "TT": "Met/Met variant. Associated with better cardiovascular response to endurance training and more efficient blood pressure regulation during sustained exercise. May excel at aerobic activities.",
      "AT": "Mixed profile (Met/Thr). Balanced cardiovascular training response - can adapt to various exercise types.",
      "AA": "Thr/Thr variant. May respond more favorably to power/strength training than pure endurance activities. Different blood pressure regulation pattern."
    }
  },

  rs1042713: {
    category: "performance",
    name: "ADRB2 - Beta-2 Receptor (Exercise Response)",
    genotypes: {
      "GG": "Gly/Gly variant. Enhanced beta-2 receptor function. May have better cardiovascular response to exercise and improved fat metabolism during activity.",
      "AG": "Mixed Gly/Arg. Moderate beta-2 receptor effects on exercise performance and metabolism.",
      "AA": "Arg/Arg variant. Different beta-2 receptor sensitivity affecting cardiovascular response to training and stress."
    }
  },

  rs1042714: {
    category: "performance",
    name: "ADRB2 - Beta-2 Receptor (Cardiovascular)",
    genotypes: {
      "CC": "Common variant affecting heart rate and blood pressure response during exercise.",
      "CG": "Heterozygous for beta-2 receptor variant with moderate effects on cardiovascular function.",
      "GG": "Variant influencing cardiovascular adaptation to exercise training."
    }
  },
  
  // ============================================
  // CATEGORY 4: NUTRITION (Metabolism & Diet)
  // ============================================

  rs4988235: {
    category: "nutrition",
    name: "LCT - Lactase Persistence (Dairy Tolerance)",
    genotypes: {
      "AA": "Lactase persistent! Can digest milk sugar (lactose) as an adult. This mutation arose ~10,000 years ago in Northern Europe with dairy farming and spread through populations that relied on milk. You can enjoy dairy without issues.",
      "AG": "Partially lactose tolerant. Some lactase enzyme continues into adulthood. May handle small amounts of dairy or aged cheeses (lower lactose) but not large quantities of milk.",
      "GG": "Lactose intolerant (ancestral variant). Lactase production stops after childhood - you cannot digest milk sugar. Found in ~90% of East Asians, ~90% of West Africans, ~70% of Southern Europeans, ~90% of Middle Easterners. Use lactose-free dairy or avoid dairy altogether."
    }
  },
  
  rs762551: {
    category: "nutrition",
    name: "CYP1A2 - Caffeine Metabolism Speed",
    genotypes: {
      "AA": "Fast caffeine metabolizer! You clear caffeine from your system rapidly (~4 hours). Can drink espresso at 8 PM and sleep fine. May need that afternoon cup since morning coffee wears off quickly. Caffeine less likely to cause jitters, anxiety, or heart palpitations. Lucky genotype for coffee lovers!",
      "AC": "Moderate caffeine metabolism (~6 hours clearance). Typical coffee response - energizing in morning, but late afternoon coffee may affect evening sleep. Most people fall here.",
      "CC": "Slow caffeine metabolizer (~8+ hours). Caffeine lingers in your system much longer. Even morning coffee can affect afternoon heart rate and evening sleep. Associated with higher risk of heart issues from excess caffeine. Consider limiting intake to 1-2 cups before noon, or switch to decaf/tea."
    }
  },
  
  rs671: {
    category: "nutrition",
    name: "ALDH2 - Alcohol Flush Response (Asian Flush)",
    genotypes: {
      "GG": "Normal alcohol metabolism. No 'Asian flush' reaction. You process toxic acetaldehyde (alcohol byproduct) efficiently without turning red or feeling sick. Typical alcohol tolerance.",
      "GA": "One copy of slow ALDH2 variant. Moderate alcohol flush and sensitivity - face may turn red when drinking, some nausea or rapid heartbeat. Acetaldehyde accumulates moderately. This actually protects against alcoholism since drinking feels unpleasant.",
      "AA": "Strong alcohol flush response! Face turns bright red, nausea, headaches, rapid heartbeat even from small amounts of alcohol. Acetaldehyde accumulates to toxic levels. Found in ~30-50% of East Asians. IMPORTANT: This genotype substantially increases cancer risk (especially esophageal) from alcohol - strongly consider limiting or avoiding alcohol."
    }
  },
  
  rs1229984: {
    category: "nutrition",
    name: "ADH1B - Alcohol Metabolism Speed",
    genotypes: {
      "TT": "Very fast alcohol metabolism (ADH1B*2). You convert alcohol to acetaldehyde rapidly, then clear it quickly (if you have normal ALDH2). Sober up faster. Common in East Asians. This variant is protective against alcoholism - people with it tend to drink less.",
      "CT": "Moderate-fast alcohol metabolism. One copy of rapid variant (ADH1B*1/*2). Clear alcohol from system faster than average. Intermediate effect.",
      "CC": "Slow/normal alcohol metabolism (ADH1B*1). You process alcohol at typical rate - effects may linger longer. Most common in Europeans and Africans."
    }
  },
  
  rs9939609: {
    category: "nutrition",
    name: "FTO - The Appetite & Weight Gene",
    genotypes: {
      "AA": "Two copies of higher appetite variant. Associated with increased BMI (+3-4 kg on average), stronger hunger signals, more food cravings, and reduced satiety. You may feel hungry more often and think about food more. DOESN'T mean obesity is inevitable - just means mindful eating, portion control, and choosing filling foods (protein, fiber) are extra important for you.",
      "AT": "One copy of FTO appetite variant (+1-2 kg effect on BMI). Moderate effect on hunger signaling and weight management. Noticeable but manageable with good habits.",
      "TT": "Lower appetite variant. Better natural satiety signals - you feel full sooner and stay satisfied longer. Easier time with weight management. Your brain's hunger/fullness signals are more favorable."
    }
  },
  
  rs174537: {
    category: "nutrition",
    name: "FADS1 - Omega-3 Fatty Acid Conversion",
    genotypes: {
      "GG": "Excellent omega-3 processor! You efficiently convert plant-based ALA (from flax, chia, walnuts) into EPA and DHA (the forms used by brain and body). Vegetarian/vegan omega-3 sources work great for you. Can get adequate omega-3s without fish.",
      "AG": "Moderate omega-3 conversion ability (~50% efficient). Mix of plant and fish sources recommended for optimal levels. Not terrible at conversion but not optimal either.",
      "AA": "Poor omega-3 conversion (<30% efficient). You struggle to make EPA/DHA from plant ALA. Should prioritize direct sources: fatty fish (salmon, sardines, mackerel) or algae-based supplements. Plant sources alone won't give you adequate EPA/DHA."
    }
  },
  
  rs1801133: {
    category: "nutrition",
    name: "MTHFR - Folate Processing (C677T Variant)",
    genotypes: {
      "GG": "Normal MTHFR enzyme function (100% activity). You efficiently process folate for DNA synthesis, methylation, and homocysteine metabolism. Standard dietary folate from leafy greens, legumes is perfectly fine.",
      "AG": "One copy of C677T variant (~65% enzyme activity). Mildly reduced folate processing. Generally not problematic with a healthy diet. Homocysteine may be slightly elevated. Ensure good folate intake from diet.",
      "AA": "C677T/C677T variant (~30% enzyme activity). Significantly reduced MTHFR function. Higher risk of elevated homocysteine (linked to cardiovascular issues). Should ensure excellent folate intake - eat plenty of leafy greens, beans. May benefit from methylfolate (active form) supplements rather than regular folic acid. Important if pregnant (folate crucial for fetal development)."
    }
  },

  rs1801131: {
    category: "nutrition",
    name: "MTHFR - Folate Processing (A1298C Variant)",
    genotypes: {
      "GG": "Normal at A1298C position. No reduction in MTHFR activity from this variant.",
      "GT": "One copy of A1298C variant. Mild effect on folate metabolism, especially if combined with C677T variant.",
      "TT": "A1298C/A1298C variant. Can affect folate processing, particularly in combination with C677T. Ensure adequate folate intake."
    }
  },

  rs12785878: {
    category: "nutrition",
    name: "Vitamin B12 Levels",
    genotypes: {
      "GG": "Associated with normal vitamin B12 levels and metabolism.",
      "GT": "Moderate effect on B12 levels. May need to monitor B12 status.",
      "TT": "May have tendency toward lower B12 levels. Consider monitoring and supplementation if needed, especially if vegetarian/vegan."
    }
  },

  rs602662: {
    category: "nutrition",
    name: "TAS1R3 - Umami Taste Sensitivity",
    genotypes: {
      "AA": "Enhanced umami detection! Savory, glutamate-rich flavors are intense and delicious for you. MSG, mushrooms, aged cheese, tomatoes, soy sauce, parmesan, bone broth taste AMAZING. The glutamate-sensitive variant makes savory foods more rewarding.",
      "AG": "Moderate umami sensitivity. Savory flavors taste good but not overwhelmingly so. Average response to glutamate-rich foods.",
      "GG": "Lower umami sensitivity. Savory/glutamate flavors are less pronounced for you. May not understand the hype about MSG or aged cheeses."
    }
  },

  rs17782313: {
    category: "nutrition",
    name: "MC4R - Hunger Hormone Signaling",
    genotypes: {
      "TT": "Variant associated with increased hunger and higher BMI tendency. Melanocortin-4 receptor affects satiety signals.",
      "CT": "Heterozygous for MC4R hunger variant. Moderate effect on feeling 'full' after meals.",
      "CC": "Common MC4R variant with typical satiety and hunger hormone function."
    }
  },
  
  // ============================================
  // CATEGORY 5: HEALTH (Disease Risk & Medical)
  // ============================================

  rs1061170: {
    category: "health",
    name: "CFH - Age-Related Macular Degeneration Risk",
    genotypes: {
      "TT": "HIGH RISK for AMD (age-related macular degeneration) - leading cause of vision loss after age 60. Two copies of Y402H risk variant means 5-7x higher risk. CRITICAL: Wear UV-blocking sunglasses outdoors, take eye vitamins (lutein, zeaxanthin, zinc), avoid smoking (dramatically worsens risk), eat leafy greens, get regular eye exams after age 50. Early detection is key.",
      "CT": "Moderate-high AMD risk (2-3x average). One copy of Y402H variant. Important to protect your vision: sunglasses, eye vitamins (AREDS2 formula), regular eye screenings, avoid smoking. Still significant risk.",
      "CC": "Lower AMD risk. The C/C genotype is protective - your CFH gene functions normally to regulate inflammation in the retina. Standard eye care recommended but genetics are favorable."
    }
  },

  rs12979860: {
    category: "health",
    name: "IL28B - Hepatitis C Response & Immune Function",
    genotypes: {
      "CC": "BEST possible genotype! If exposed to Hepatitis C, you have 70-80% chance of spontaneously clearing the infection (vs 25% for TT). Best response to interferon treatment. Favorable interferon lambda response - this affects general antiviral immunity too.",
      "CT": "Moderate Hepatitis C response. ~50% spontaneous clearance rate if infected. Intermediate treatment response. Still decent immune function.",
      "TT": "Lower response to Hepatitis C (~25% spontaneous clearance). Interferon treatment historically less effective. HOWEVER - modern direct-acting antiviral drugs work great regardless of genotype. This mainly mattered in old HCV treatment era."
    }
  },

  rs1800562: {
    category: "health",
    name: "HFE - Hereditary Hemochromatosis (C282Y)",
    genotypes: {
      "AA": "C282Y/C282Y - HIGH RISK for hereditary hemochromatosis! Your body absorbs excessive iron from food, leading to iron overload. Can cause: liver cirrhosis, diabetes, heart problems, joint pain, bronze skin. Most common genetic disease in Europeans (1 in 200). GET TESTED: Serum iron, ferritin, transferrin saturation. Treatment is simple: therapeutic phlebotomy (blood donation). Avoid iron supplements and excessive red meat.",
      "AG": "Carrier for hemochromatosis (one C282Y copy). Low personal risk unless you also have H63D variant. Important for family planning - if partner is also carrier, children could have disease. Monitor iron levels occasionally.",
      "GG": "No C282Y mutation. Very low hemochromatosis risk from this variant (could still have H63D). Normal iron absorption and metabolism."
    }
  },

  rs1799945: {
    category: "health",
    name: "HFE - Hemochromatosis (H63D Variant)",
    genotypes: {
      "GG": "H63D/H63D or compound heterozygous (one C282Y + one H63D). Mild to moderate iron overload risk. Not as severe as C282Y/C282Y but should monitor iron levels. May develop mild hemochromatosis symptoms.",
      "CG": "H63D carrier. Mild effect on iron absorption. If you also have one C282Y (compound heterozygote), monitor iron levels as this combination can cause mild hemochromatosis.",
      "CC": "No H63D mutation. Normal iron absorption from this variant."
    }
  },

  rs1333049: {
    category: "health",
    name: "9p21 - Coronary Artery Disease Risk",
    genotypes: {
      "GG": "HIGHER HEART DISEASE RISK. The 9p21 region is one of the strongest genetic risk factors for coronary artery disease. GG genotype means 1.5-2x higher risk of heart attack and coronary blockages. CRITICAL: Prioritize cardiovascular health - regular cardio exercise, Mediterranean diet, maintain healthy weight, monitor blood pressure/cholesterol, don't smoke, manage stress. Genetics aren't destiny but demand respect.",
      "CG": "Moderate heart disease risk. One copy of 9p21 risk variant. Lifestyle still matters enormously - this variant can be largely offset by healthy habits. Stay active and eat well.",
      "CC": "PROTECTIVE! Significantly lower coronary artery disease risk. Your 9p21 region is favorable for cardiovascular health. Still maintain healthy habits but genetics are on your side."
    }
  },

  rs7903146: {
    category: "health",
    name: "TCF7L2 - Type 2 Diabetes Risk",
    genotypes: {
      "TT": "HIGHEST Type 2 diabetes risk (~2x average). TCF7L2 is the strongest common genetic risk factor for diabetes. Affects insulin secretion and glucose regulation. CRITICAL: Maintain healthy weight, exercise regularly (especially resistance training), low glycemic diet, avoid sugary drinks, monitor blood sugar. Early lifestyle intervention is hugely protective.",
      "CT": "Moderately elevated diabetes risk (~1.4x). One copy of risk variant. Watch refined carbs and stay active - very preventable with good habits.",
      "CC": "Lower diabetes risk from TCF7L2 (most protective genotype). Standard diabetes prevention still recommended but genetics are favorable."
    }
  },

  rs10830963: {
    category: "health",
    name: "MTNR1B - Fasting Glucose & Diabetes Risk",
    genotypes: {
      "GG": "Variant associated with higher fasting glucose levels and increased Type 2 diabetes risk. Melatonin receptor affects insulin secretion. Monitor blood sugar.",
      "CG": "Moderate effect on glucose regulation and diabetes risk.",
      "CC": "Normal melatonin receptor function and typical glucose metabolism."
    }
  },

  rs5219: {
    category: "health",
    name: "KCNJ11 - Neonatal Diabetes & Type 2 Risk",
    genotypes: {
      "TT": "Variant affecting pancreatic potassium channel. Slightly elevated Type 2 diabetes risk. Rare cause of neonatal diabetes if two copies of specific mutations.",
      "CT": "Heterozygous for KCNJ11 variant with mild effects on insulin secretion.",
      "CC": "Normal KCNJ11 function. Typical insulin secretion and diabetes risk."
    }
  },

  rs1051730: {
    category: "health",
    name: "CHRNA3 - Nicotine Dependence & Lung Cancer",
    genotypes: {
      "AA": "Higher risk of nicotine addiction if you smoke. Also 30% increased lung cancer risk per copy of A allele - even more reason not to smoke. The A variant affects nicotinic receptors in brain reward pathways.",
      "AG": "Moderate nicotine dependence risk and slightly elevated lung cancer susceptibility if smoking.",
      "GG": "Lower nicotine addiction risk. If you smoke, may find it easier to quit. Still shouldn't smoke, but genetics are more favorable."
    }
  },

  rs16969968: {
    category: "health",
    name: "CHRNA5 - Nicotine Dependence & Smoking Quantity",
    genotypes: {
      "AA": "Higher nicotine dependence risk. Smoke more cigarettes per day if you smoke. Harder time quitting. Also associated with COPD and lung cancer risk.",
      "AG": "Moderate nicotine dependence and smoking intensity.",
      "GG": "Lower nicotine addiction vulnerability. May smoke fewer cigarettes per day if you do smoke."
    }
  },

  rs1800629: {
    category: "health",
    name: "TNF-alpha - Inflammation & Autoimmune Risk",
    genotypes: {
      "AA": "Higher TNF-alpha production. Increased inflammation and higher risk of autoimmune conditions (rheumatoid arthritis, inflammatory bowel disease). May respond better to anti-TNF biologics if needed.",
      "AG": "Moderate TNF-alpha levels and inflammation tendency.",
      "GG": "Normal TNF-alpha production. Typical inflammatory response."
    }
  },

  rs1800795: {
    category: "health",
    name: "IL-6 - Inflammatory Cytokine Production",
    genotypes: {
      "GG": "Higher IL-6 (interleukin-6) production. More inflammatory response. Associated with higher cardiovascular disease risk and some autoimmune conditions.",
      "CG": "Moderate IL-6 production and inflammatory tendency.",
      "CC": "Lower IL-6 production. Less inflammatory response - generally protective for cardiovascular health."
    }
  },

  rs231775: {
    category: "health",
    name: "CTLA4 - Autoimmune Disease Risk",
    genotypes: {
      "GG": "Higher autoimmune disease risk, especially Type 1 diabetes, Hashimoto's thyroiditis, Graves' disease. CTLA4 regulates immune system - this variant increases self-attack. Monitor thyroid function. Watch for autoimmune symptoms.",
      "AG": "Moderately elevated autoimmune susceptibility. One copy of risk variant. Be aware of autoimmune disease symptoms.",
      "AA": "Lower autoimmune disease risk. Better immune regulation through CTLA4 pathway."
    }
  },

  rs6983267: {
    category: "health",
    name: "Colorectal & Prostate Cancer Risk",
    genotypes: {
      "GG": "Elevated risk for colorectal cancer (1.3x) and prostate cancer if male. This 8q24 region variant is one of the strongest common cancer risk factors. CRITICAL: If male, discuss PSA screening timeline with doctor. For everyone: colonoscopy starting at 45 (or earlier if family history), high-fiber diet, exercise, maintain healthy weight, limit red/processed meat.",
      "GT": "Moderately elevated colorectal and prostate cancer risk. One copy of risk variant. Follow screening guidelines carefully.",
      "TT": "Lower cancer risk from this variant. Standard screening still recommended."
    }
  },

  rs11209026: {
    category: "health",
    name: "IL23R - Crohn's Disease Protection",
    genotypes: {
      "AA": "HIGHLY PROTECTIVE against Crohn's disease and ulcerative colitis! The rare A allele provides strong IBD protection. Very lucky variant.",
      "AG": "Partial protection against inflammatory bowel disease. One copy of protective variant reduces risk.",
      "GG": "No special IBD protection. Typical Crohn's/UC risk for your population."
    }
  },

  rs601338: {
    category: "health",
    name: "FUT2 - Secretor Status & Gut Microbiome",
    genotypes: {
      "AA": "Secretor! You secrete ABO blood antigens in saliva, tears, and gut. ~80% of people. Affects gut microbiome composition, norovirus susceptibility (secretors are more vulnerable), and vitamin B12 absorption. Different microbiome than non-secretors.",
      "AG": "Heterozygous secretor. Partial secretion of blood antigens. Intermediate effects.",
      "GG": "Non-secretor. Don't secrete ABO antigens in body fluids. ~20% of people. Different gut bacteria, resistant to many norovirus strains, possibly different B12 needs."
    }
  },

  rs1799990: {
    category: "health",
    name: "PRNP - Prion Disease Resistance",
    genotypes: {
      "AG": "PROTECTIVE heterozygosity! Having one M and one V allele at codon 129 provides strong resistance to prion diseases (Creutzfeldt-Jakob disease, kuru). Heterozygotes rarely get prion diseases. This is the favorable genotype.",
      "AA": "M/M homozygote. Higher susceptibility to prion diseases, though still very rare. Most CJD cases occur in M/M individuals.",
      "GG": "V/V homozygote. Moderate prion disease risk. Less susceptible than M/M but not as protected as heterozygotes."
    }
  },

  // ============================================
  // CATEGORY 6: SENSES (Appearance & Sensory)
  // ============================================

  rs713598: {
    category: "senses",
    name: "TAS2R38 - Bitter Taste (PTC/PROP Taster Status)",
    genotypes: {
      "CC": "Super-taster! You taste bitter compounds (PTC/PROP) INTENSELY. Brussels sprouts, kale, broccoli, coffee, dark chocolate, tonic water taste VERY bitter. Makes eating cruciferous vegetables harder. May prefer sweet foods. This trait evolved to detect toxic alkaloids in plants.",
      "CG": "Medium taster. Moderate bitter sensitivity. Most vegetables are manageable - you taste bitterness but not overwhelmingly.",
      "GG": "Non-taster! Bitter compounds taste much milder to you. Brussels sprouts, kale, coffee are less bitter. Lucky trait for healthy eating! More willing to eat bitter vegetables. May prefer IPAs and dark chocolate."
    }
  },

  rs1726866: {
    category: "senses",
    name: "Asparagus Metabolite Detection (Olfactory)",
    genotypes: {
      "AA": "Super-smeller! You detect the asparagus metabolite odor VERY strongly. The distinctive smell after eating asparagus is overwhelming for you. About 40% of people have this genetic ability.",
      "AG": "Moderate detection of asparagus smell. You can smell it but not as intensely.",
      "GG": "Non-smeller (or very weak detection). You likely don't notice the distinctive asparagus odor in urine. The metabolite is still produced - you just can't detect it. ~60% of people are like you."
    }
  },

  rs1805007: {
    category: "senses",
    name: "MC1R - Red Hair & Fair Skin",
    genotypes: {
      "TT": "Strong red hair variant! Likely red or strawberry blonde hair, very fair skin that burns easily, freckles. Also: higher pain sensitivity, different anesthesia requirements (may need ~20% more), higher melanoma risk. The classic 'redhead' variant.",
      "CT": "Red hair carrier. May have reddish tints in hair or beard, some freckles. One copy of MC1R red variant. May have some increased sun sensitivity.",
      "CC": "No red hair variant from this position. Typical melanin production for your ancestry. Normal pain sensitivity and anesthesia response."
    }
  },

  rs1805008: {
    category: "senses",
    name: "MC1R - Red Hair (Another Variant)",
    genotypes: {
      "TT": "Red hair variant affecting melanin production. Contributes to red/blonde hair, fair skin, freckles.",
      "CT": "One copy of MC1R red hair variant. May have some features (reddish tones, freckles).",
      "CC": "Normal melanin production from this MC1R variant."
    }
  },

  rs1042602: {
    category: "senses",
    name: "TYR - Hair & Skin Pigmentation",
    genotypes: {
      "AA": "Lighter pigmentation variant (common in Europeans). Associated with lighter brown or blonde hair and lighter skin in Northern populations.",
      "AC": "Intermediate pigmentation. Mixed melanin production.",
      "CC": "Darker pigmentation variant. More melanin production in hair and skin. Common in African, Asian, Middle Eastern populations."
    }
  },

  rs12203592: {
    category: "senses",
    name: "IRF4 - Hair Color & Freckling",
    genotypes: {
      "TT": "Higher likelihood of blonde or light brown hair and freckling. Common in Northern Europeans. The T variant reduces melanin in hair.",
      "CT": "Moderate hair lightening effect and some freckling tendency. May have lighter hair than parents' average.",
      "CC": "Lower freckling and hair lightening tendency. Darker hair color more likely. Normal melanin production."
    }
  },

  rs16891982: {
    category: "senses",
    name: "SLC45A2 - Hair & Skin Pigmentation",
    genotypes: {
      "GG": "Lighter pigmentation variant common in Europeans. Associated with blonde or light brown hair.",
      "CG": "Mixed pigmentation. One light, one darker variant.",
      "CC": "Darker pigmentation variant. More melanin in hair and skin."
    }
  },

  rs1393350: {
    category: "senses",
    name: "EDA2R - Hair Thickness",
    genotypes: {
      "GG": "Thicker hair variant. More robust hair follicles and denser hair growth.",
      "GT": "Moderate hair thickness. Intermediate between thick and thin hair types.",
      "TT": "Thinner hair (European pattern). Finer hair follicles. Doesn't mean less healthy, just different structure."
    }
  },

  rs17822931: {
    category: "senses",
    name: "ABCC11 - Earwax Type & Body Odor",
    genotypes: {
      "CC": "Wet, sticky earwax (dominant trait). Normal body odor production through ABCC11 transporter. Typical of European, African, and Middle Eastern populations. May need deodorant.",
      "CT": "Mixed - likely wet earwax but possibly intermediate body odor production. One copy of dry variant.",
      "TT": "Dry, flaky earwax. Reduced body odor production - the T variant prevents odor-causing molecules from being secreted in sweat. Nearly universal (95%+) in East Asians, rare elsewhere. May not need deodorant. Lucky trait!"
    }
  },

  rs10427255: {
    category: "senses",
    name: "Photic Sneeze Reflex (Sun Sneezing)",
    genotypes: {
      "TT": "Higher likelihood of photic sneeze reflex - sneezing when looking at bright light! Affects ~20-30% of people. Thought to involve trigeminal nerve cross-wiring.",
      "CT": "May have mild photic sneeze tendency.",
      "CC": "Less likely to sneeze in bright sunlight. Typical light response."
    }
  },

  // ============================================
  // CATEGORY 7: LONGEVITY (Aging & Lifespan)
  // ============================================

  rs2802292: {
    category: "longevity",
    name: "FOXO3 - THE Longevity Gene",
    genotypes: {
      "TT": "Exceptional longevity variant! This is the most replicated longevity gene across ALL populations worldwide. T/T genotype is found in centenarians (100+) and super-centenarians (110+). Present in 10-15% of people. Benefits: significantly increased likelihood of living to 90-100+, better insulin sensitivity (diabetes protection), protection against age-related diseases, enhanced cellular stress resistance, superior cardiovascular aging, maintained cognitive function in old age, better mitochondrial function. Your cells are built to last.",
      "GT": "One copy of FOXO3 longevity variant. Still significantly protective - better than average aging potential and healthspan. Intermediate benefits for insulin sensitivity, cardiovascular health, and cellular resilience.",
      "GG": "Common variant. Standard aging trajectory. Doesn't mean short life - just not the enhanced longevity genetics. Lifestyle still matters enormously for healthspan and lifespan."
    }
  },

  rs10757274: {
    category: "longevity",
    name: "9p21 - Cardiovascular Aging (Another Position)",
    genotypes: {
      "GG": "Protective for cardiovascular aging! Lower risk of coronary artery disease and heart attacks. Part of favorable 9p21 haplotype.",
      "AG": "Moderate cardiovascular aging profile.",
      "AA": "Higher cardiovascular disease risk from 9p21 region. Same locus as rs1333049 - one of strongest heart disease risk factors."
    }
  },

  rs10757278: {
    category: "longevity",
    name: "9p21 - Cardiovascular Aging (Third Position)",
    genotypes: {
      "GG": "Protective for heart disease. Favorable 9p21 genotype associated with better cardiovascular aging.",
      "AG": "Intermediate cardiovascular risk.",
      "AA": "Elevated coronary artery disease risk. Part of 9p21 risk haplotype."
    }
  },

  rs429358: {
    category: "longevity",
    name: "APOE - Alzheimer's & Cardiovascular Risk (Part 1)",
    genotypes: {
      "CC": "ε4/ε4 (if rs7412 is C/C). HIGHEST Alzheimer's risk - 8-12x vs ε3/ε3. Also higher cardiovascular disease risk and worse outcomes from head injuries. ~2% of population. CRITICAL: Prioritize brain health - Mediterranean diet, regular aerobic exercise, social engagement, cognitive challenges, quality sleep, manage cardiovascular risk factors aggressively. Many ε4/ε4 individuals live to old age with sharp minds - lifestyle matters enormously.",
      "CT": "Likely ε3/ε4 (check rs7412 to confirm). One copy of APOE4 means 2-3x Alzheimer's risk vs ε3/ε3. Higher cholesterol response to dietary saturated fat. ~25% of population. Important: Stay physically active, eat well, challenge your brain, monitor cardiovascular health.",
      "TT": "ε3/ε3, ε3/ε2, or ε2/ε2 (need rs7412 to determine). If ε3/ε3: most common, average Alzheimer's risk. If ε2 carrier: protective against Alzheimer's! The ε2 allele lowers AD risk."
    }
  },

  rs7412: {
    category: "longevity",
    name: "APOE - Alzheimer's Risk (Part 2 - Combined with rs429358)",
    genotypes: {
      "TT": "If rs429358 is T/T: you're ε2/ε2 - HIGHLY PROTECTIVE against Alzheimer's! Rarest APOE type (~1%). Also associated with longevity. But slightly higher triglycerides and rare risk of type III hyperlipoproteinemia.",
      "CT": "Part of APOE haplotype determination. Combined with rs429358 determines if you're ε2/ε3 (protective), ε3/ε4 (risk), etc.",
      "CC": "Combined with rs429358 determines your APOE status (ε2, ε3, or ε4). See rs429358 for interpretation."
    }
  },

  rs405509: {
    category: "longevity",
    name: "APOE Promoter - Alzheimer's Modifier",
    genotypes: {
      "GG": "Variant in APOE gene promoter region affecting APOE expression levels. May modify Alzheimer's risk independently of ε2/ε3/ε4 status.",
      "GT": "Heterozygous for APOE promoter variant.",
      "TT": "APOE promoter variant affecting gene expression."
    }
  },

  rs4420638: {
    category: "longevity",
    name: "APOC1/APOE - Cognitive Aging",
    genotypes: {
      "AA": "Variant near APOE affecting cognitive aging and potentially Alzheimer's risk through cholesterol metabolism.",
      "AG": "Heterozygous for APOC1 region variant.",
      "GG": "Protective variant for cognitive aging in APOE/APOC1 region."
    }
  },

  rs7216389: {
    category: "longevity",
    name: "Longevity-Associated Variant",
    genotypes: {
      "TT": "Variant associated with longevity in some populations. May influence lifespan through growth and development pathways.",
      "CT": "Heterozygous for longevity-associated variant.",
      "CC": "Common variant."
    }
  },

  rs9536314: {
    category: "longevity",
    name: "KLOTHO - 'Aging Suppressor Gene'",
    genotypes: {
      "GG": "Variant in KLOTHO, called the 'aging suppressor' gene. Affects kidney function, phosphate metabolism, cognitive function, and longevity. The KLOTHO protein regulates aging processes.",
      "GT": "Heterozygous for KLOTHO variant. One of the most interesting aging-related genes - influences multiple aging systems.",
      "TT": "KLOTHO variant affecting aging-related pathways including cognition, cardiovascular health, and renal function."
    }
  },

  rs5882: {
    category: "longevity",
    name: "CETP - HDL Cholesterol & Longevity",
    genotypes: {
      "AA": "CETP I405V variant. Associated with higher HDL ('good') cholesterol, larger lipoprotein particles, and longevity in some populations. The A allele reduces CETP activity.",
      "AG": "Intermediate CETP activity and HDL levels.",
      "GG": "Higher CETP activity. May have lower HDL cholesterol. The G/G genotype is more common but less favorable for HDL levels."
    }
  },

  rs1800896: {
    category: "longevity",
    name: "IL-10 - Anti-inflammatory Longevity",
    genotypes: {
      "AA": "Higher IL-10 production. IL-10 is anti-inflammatory - high producers may have better control of chronic inflammation, which is key to healthy aging. Associated with longevity in some studies.",
      "AG": "Moderate IL-10 (anti-inflammatory cytokine) production.",
      "GG": "Lower IL-10 production. May have higher chronic inflammation with aging."
    }
  },

  rs2075650: {
    category: "longevity",
    name: "TOMM40 - Mitochondrial Import (Near APOE)",
    genotypes: {
      "AA": "Variant in TOMM40 gene (near APOE) affecting mitochondrial protein import. May influence cognitive aging and Alzheimer's risk through mitochondrial function.",
      "AG": "Heterozygous for TOMM40 variant.",
      "GG": "TOMM40 variant linked to cognitive aging and potentially lifespan through mitochondrial health."
    }
  },

  rs2234693: {
    category: "longevity",
    name: "ESR1 - Estrogen Receptor (Bone & Heart Aging)",
    genotypes: {
      "TT": "Variant in estrogen receptor alpha affecting bone density, cardiovascular health, and aging in both sexes (not just women). May influence fracture risk and heart disease with aging.",
      "CT": "Heterozygous for ESR1 variant affecting estrogen signaling.",
      "CC": "ESR1 variant influencing bone health and cardiovascular aging through estrogen receptor function."
    }
  },

  rs9340799: {
    category: "longevity",
    name: "ESR1 - Estrogen Receptor (Another Position)",
    genotypes: {
      "AA": "Estrogen receptor variant affecting bone density, cardiovascular health, and longevity-related pathways.",
      "AG": "Heterozygous for ESR1 affecting aging-related traits.",
      "GG": "ESR1 variant influencing healthy aging through estrogen signaling."
    }
  }
};

// Category mapping for organized analysis
const CATEGORY_RSIDS = {
  sleep: [
    'rs1801260', 'rs10830963', 'rs73598374', 'rs10506084'
  ],
  mind: [
    'rs4680', 'rs53576', 'rs6295', 'rs324420', 'rs6265', 
    'rs1800497', 'rs1799971', 'rs1799913'
  ],
  performance: [
    'rs1815739', 'rs8192678', 'rs4994', 'rs1800012', 'rs699',
    'rs1042713', 'rs1042714', 'rs7216389'
  ],
  nutrition: [
    'rs4988235', 'rs762551', 'rs671', 'rs1229984', 'rs9939609', 
    'rs174537', 'rs1801133', 'rs1801131', 'rs12785878', 'rs17782313'
  ],
  health: [
    'rs1061170', 'rs12979860', 'rs1800562', 'rs1799945', 'rs1333049',
    'rs7903146', 'rs10830963', 'rs5219', 'rs1051730', 'rs16969968',
    'rs1800629', 'rs1800795', 'rs231775', 'rs6983267', 'rs11209026',
    'rs601338', 'rs1799990', 'rs1800975', 'rs2814778'
  ],
  senses: [
    'rs713598', 'rs602662', 'rs1726866', 'rs1805007', 'rs1805008',
    'rs1042602', 'rs12203592', 'rs16891982', 'rs1393350', 'rs17822931',
    'rs10427255'
  ],
  longevity: [
    'rs2802292', 'rs10757274', 'rs10757278', 'rs429358', 'rs7412',
    'rs405509', 'rs4420638', 'rs7216389', 'rs9536314', 'rs5882',
    'rs1800896', 'rs2075650', 'rs2234693', 'rs9340799'
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KNOWLEDGE_BASE, CATEGORY_RSIDS };
} else {
  // Browser global export
  window.knowledgeBase = { KNOWLEDGE_BASE, CATEGORY_RSIDS };
}