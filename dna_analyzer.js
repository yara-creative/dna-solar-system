// DNA Analyzer - Parses DNA files and generates analysis
// 100% LOCAL - No API calls, runs entirely in browser

class DNAAnalyzer {
  constructor(knowledgeBase) {
    this.knowledgeBase = knowledgeBase;
    this.parsedData = null;
  }

  // Parse filtered DNA content into a simple genotype map
  parseDNA(filteredContent) {
    console.log('🧬 Parsing DNA content...');
    const lines = filteredContent.split('\n');
    console.log('Total lines to parse:', lines.length);
    console.log('Sample line format:', lines[1]);
    
    const genotypeMap = new Map();
    const matchedSnps = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;
      
      const parts = line.split(/[\t\s]+/);
      const rsid = parts[0];
      
      // Get genotype - handle both formats
      let genotype = '';
      
      // Format 1: genotype in column 3 (4th column)
      if (parts[3] && parts[3].length === 2 && /^[AGCT]{2}$/.test(parts[3])) {
        genotype = parts[3];
      }
      // Format 2: allele1 + allele2 in columns 3 and 4
      else if (parts[3] && parts[4] && /^[AGCT]$/.test(parts[3]) && /^[AGCT]$/.test(parts[4])) {
        genotype = parts[3] + parts[4];
      }
      
      // Only store if we got a valid 2-letter genotype
      if (genotype.length === 2 && /^[AGCT]{2}$/.test(genotype)) {
        const normalized = this.normalizeGenotype(genotype[0], genotype[1]);
        genotypeMap.set(rsid, normalized);
        
        // Track matched SNPs
        if (this.knowledgeBase[rsid]) {
          matchedSnps.push({ rsid, genotype: normalized });
        }
      }
    }
    
    console.log('=== STEP 2: PARSING ===');
    console.log('✅ Matched SNPs:', matchedSnps.length);
    if (matchedSnps.length > 0) {
      console.log('First matched SNP:', matchedSnps[0]);
    }
    console.log('Total matched SNPs:', matchedSnps.length);
    console.log('First 3 matched SNPs:', matchedSnps.slice(0, 3));
    
    this.parsedData = genotypeMap;
    return genotypeMap;
  }

  // Normalize genotype to alphabetical order (e.g., "GA" -> "AG")
  normalizeGenotype(allele1, allele2) {
    // Handle insertions/deletions
    if (allele1 === '-' || allele1 === 'D') allele1 = 'D';
    if (allele2 === '-' || allele2 === 'D') allele2 = 'D';
    if (allele1 === 'I') allele1 = 'I';
    if (allele2 === 'I') allele2 = 'I';
    
    // Sort alphabetically for consistency
    const sorted = [allele1, allele2].sort();
    return sorted.join('');
  }

  // Generate analysis for all categories
  generateFullAnalysis() {
    if (!this.parsedData) {
      throw new Error('No DNA data parsed. Call parseDNA() first.');
    }

    const analysis = {
      sleep: this.analyzeCategoryDetailed('sleep'),
      mind: this.analyzeCategoryDetailed('mind'),
      performance: this.analyzeCategoryDetailed('performance'),
      nutrition: this.analyzeCategoryDetailed('nutrition'),
      health: this.analyzeCategoryDetailed('health'),
      senses: this.analyzeCategoryDetailed('senses'),
      longevity: this.analyzeCategoryDetailed('longevity')
    };

    console.log('=== STEP 3: GENERATE ANALYSIS ===');
    Object.keys(analysis).forEach(cat => {
      console.log(`${cat}: ${analysis[cat].traits.length} findings`);
    });
    console.log('Full analysis object:', analysis);

    return analysis;
  }

  // Analyze a single category in detail
  analyzeCategoryDetailed(category) {
    const categoryData = {
      category: category,
      traits: [],
      summary: '',
      highlights: []
    };

    // Get all RSIDs for this category
    const categoryRsids = Object.keys(this.knowledgeBase).filter(
      rsid => this.knowledgeBase[rsid].category === category
    );

    // Analyze each RSID
    for (const rsid of categoryRsids) {
      const genotype = this.parsedData.get(rsid);
      if (!genotype) continue; // Skip if not in user's data

      const snpInfo = this.knowledgeBase[rsid];
      const interpretation = this.getInterpretation(rsid, genotype);

      if (interpretation) {
        categoryData.traits.push({
          rsid: rsid,
          name: snpInfo.name,
          genotype: genotype,
          interpretation: interpretation,
          raw: snpInfo
        });
      }
    }

    // Generate category summary
    categoryData.summary = this.generateCategorySummary(category, categoryData.traits);
    
    // Extract highlights (most interesting findings)
    categoryData.highlights = this.extractHighlights(categoryData.traits);

    return categoryData;
  }

  // Get interpretation for a specific genotype
  getInterpretation(rsid, genotype) {
    const snpInfo = this.knowledgeBase[rsid];
    if (!snpInfo || !snpInfo.genotypes) return null;

    // Try exact match
    if (snpInfo.genotypes[genotype]) {
      return snpInfo.genotypes[genotype];
    }

    // Try reverse (e.g., if we have "GA" but database has "AG")
    const reversed = genotype.split('').reverse().join('');
    if (snpInfo.genotypes[reversed]) {
      return snpInfo.genotypes[reversed];
    }

    return null;
  }

  // Generate a natural language summary for a category
  generateCategorySummary(category, traits) {
    if (traits.length === 0) {
      return `No data available for ${category} analysis.`;
    }

    const summaries = {
      sleep: () => {
        return `Your sleep and circadian rhythm genetics are shaped by ${traits.length} key variants affecting your natural sleep-wake cycle and rest quality.`;
      },
      mind: () => {
        return `Your cognitive and personality profile is shaped by ${traits.length} key genetic variants affecting neurotransmitter function, memory, and social behavior.`;
      },
      performance: () => {
        return `Your physical performance genetics show a unique combination of ${traits.length} variants affecting muscle type, endurance, and athletic potential.`;
      },
      nutrition: () => {
        return `Your metabolic profile includes ${traits.length} genetic variants that influence how you process food, taste, and nutrients.`;
      },
      health: () => {
        return `Your health profile includes ${traits.length} genetic variants affecting disease risk, immune function, and medical considerations.`;
      },
      senses: () => {
        return `Your physical appearance and sensory traits are influenced by ${traits.length} genetic markers.`;
      },
      longevity: () => {
        return `Your longevity and aging profile includes ${traits.length} critical variants affecting lifespan potential, cardiovascular health, and cellular resilience.`;
      }
    };

    return summaries[category] ? summaries[category]() : `Analysis of ${traits.length} genetic variants.`;
  }

  // Extract the most interesting/impactful findings
  extractHighlights(traits) {
    // Keywords that indicate high-impact findings
    const highlightKeywords = [
      'Exceptional', 'BEST', 'Elite', 'Super', 'Goldilocks', 
      'PROTECTIVE', 'Enhanced', 'Excellent', 'Fast', 'HIGH RISK',
      'HIGHLY PROTECTIVE', 'significantly', 'strong', 'superior'
    ];

    return traits.filter(trait => {
      return highlightKeywords.some(keyword => 
        trait.interpretation.includes(keyword)
      );
    }).slice(0, 3); // Top 3 highlights per category
  }

  // Generate hash for shape selection based on category genotypes
  generateShapeHash(category) {
    const categoryRsids = Object.keys(this.knowledgeBase).filter(
      rsid => this.knowledgeBase[rsid].category === category
    );

    let hash = 0;
    for (const rsid of categoryRsids) {
      const genotype = this.parsedData.get(rsid);
      if (genotype) {
        // Convert genotype to numeric value
        for (let i = 0; i < genotype.length; i++) {
          hash = ((hash << 5) - hash) + genotype.charCodeAt(i);
          hash = hash & hash; // Convert to 32-bit integer
        }
      }
    }

    return Math.abs(hash);
  }

  // Generate shape variant indices for all categories (0-7 for 8 variants)
  generateShapeVariants() {
    const categories = ['sleep', 'mind', 'performance', 'nutrition', 'health', 'senses', 'longevity'];
    const shapeVariants = {};

    console.log('🔍 Generating shape variants for DNA file...');
    categories.forEach((category, familyIndex) => {
      const hash = this.generateShapeHash(category);
      const variant = hash % 8;
      shapeVariants[category] = {
        family: familyIndex,
        variant: variant
      };
      console.log(`  ${category}: family=${familyIndex}, variant=${variant}, hash=${hash}`);
    });
    console.log('✅ Shape variants generated:', shapeVariants);

    return shapeVariants;
  }

  // Get analysis for a specific category (for planet click)
  getCategoryAnalysis(categoryName) {
    if (!this.parsedData) {
      throw new Error('No DNA data parsed.');
    }

    return this.analyzeCategoryDetailed(categoryName);
  }

  // Get user's genotype for a specific RSID
  getGenotype(rsid) {
    return this.parsedData ? this.parsedData.get(rsid) : null;
  }

  // Check if user has specific genotype
  hasGenotype(rsid, genotype) {
    const userGenotype = this.getGenotype(rsid);
    if (!userGenotype) return false;
    
    const normalized = this.normalizeGenotype(genotype[0], genotype[1]);
    return userGenotype === normalized;
  }

  // Get statistics about the parsed data
  getStats() {
    if (!this.parsedData) return null;

    return {
      totalSNPs: this.parsedData.size,
      analyzedSNPs: Object.keys(this.knowledgeBase).filter(
        rsid => this.parsedData.has(rsid)
      ).length,
      categories: {
        sleep: this.getCategoryStats('sleep'),
        mind: this.getCategoryStats('mind'),
        performance: this.getCategoryStats('performance'),
        nutrition: this.getCategoryStats('nutrition'),
        health: this.getCategoryStats('health'),
        senses: this.getCategoryStats('senses'),
        longevity: this.getCategoryStats('longevity')
      }
    };
  }

  getCategoryStats(category) {
    const categoryRsids = Object.keys(this.knowledgeBase).filter(
      rsid => this.knowledgeBase[rsid].category === category
    );
    
    const found = categoryRsids.filter(rsid => this.parsedData.has(rsid)).length;
    
    return {
      total: categoryRsids.length,
      found: found,
      coverage: `${Math.round((found / categoryRsids.length) * 100)}%`
    };
  }

  // Format analysis for display in HTML
  formatForDisplay(categoryAnalysis) {
    let html = `
      <div class="category-analysis">
        <div class="summary-section" style="margin-bottom: 25px;">
          <p style="font-size: 14px; line-height: 1.6;">${categoryAnalysis.summary}</p>
        </div>
    `;

    if (categoryAnalysis.highlights.length > 0) {
      html += `
        <div class="highlights-section" style="margin-bottom: 25px;">
          <h3 style="font-size: 16px; margin-bottom: 15px; font-weight: bold;">Key Highlights</h3>
      `;
      
      categoryAnalysis.highlights.forEach(trait => {
        html += `
          <div class="trait-card highlight" style="margin-bottom: 15px; padding: 12px; background: rgba(102, 126, 234, 0.1); border-left: 3px solid #667eea; border-radius: 4px;">
            <div class="trait-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="font-size: 13px;">${trait.name}</strong>
              <span class="genotype-badge" style="background: #667eea; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold;">${trait.genotype}</span>
            </div>
            <p class="trait-interpretation" style="font-size: 13px; line-height: 1.5; margin: 0;">${trait.interpretation}</p>
          </div>
        `;
      });
      
      html += `</div>`;
    }

    html += `
      <div class="traits-section">
        <h3 style="font-size: 16px; margin-bottom: 15px; font-weight: bold;">All Findings (${categoryAnalysis.traits.length})</h3>
    `;

    categoryAnalysis.traits.forEach(trait => {
      html += `
        <div class="trait-card" style="margin-bottom: 12px; padding: 12px; background: rgba(0,0,0,0.03); border-radius: 4px;">
          <div class="trait-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 13px;">${trait.name}</strong>
            <span class="genotype-badge" style="background: #999; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold;">${trait.genotype}</span>
          </div>
          <p class="trait-interpretation" style="font-size: 13px; line-height: 1.5; margin: 0 0 8px 0;">${trait.interpretation}</p>
          <div class="trait-meta">
            <span class="rsid" style="font-size: 11px; color: #666;">${trait.rsid}</span>
          </div>
        </div>
      `;
    });

    html += `
      </div>
    </div>`;

    return html;
  }

  // Simple text format for plain text display
  formatForText(categoryAnalysis) {
    let text = `${categoryAnalysis.category.toUpperCase()}\n\n`;
    text += `${categoryAnalysis.summary}\n\n`;
    
    if (categoryAnalysis.highlights.length > 0) {
      text += `KEY HIGHLIGHTS:\n`;
      categoryAnalysis.highlights.forEach(trait => {
        text += `\n• ${trait.name} (${trait.genotype})\n`;
        text += `  ${trait.interpretation}\n`;
      });
      text += `\n`;
    }

    text += `ALL FINDINGS:\n`;
    categoryAnalysis.traits.forEach(trait => {
      text += `\n• ${trait.name} (${trait.rsid}): ${trait.genotype}\n`;
      text += `  ${trait.interpretation}\n`;
    });

    return text;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DNAAnalyzer;
}
