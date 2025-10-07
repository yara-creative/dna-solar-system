// ============================================
// DNA FILTERING LOGIC
// ============================================
// Hardcoded rsid list (must match knowledge base exactly)

const analysisRsids = new Set([
  'rs1801260',
  'rs10830963',
  'rs73598374',
  'rs10506084',
  'rs4680',
  'rs53576',
  'rs6295',
  'rs324420',
  'rs6265',
  'rs1800497',
  'rs1799971',
  'rs1799913',
  'rs1815739',
  'rs8192678',
  'rs4994',
  'rs1800012',
  'rs699',
  'rs1042713',
  'rs1042714',
  'rs7216389',
  'rs4988235',
  'rs762551',
  'rs671',
  'rs1229984',
  'rs9939609',
  'rs174537',
  'rs1801133',
  'rs1801131',
  'rs12785878',
  'rs17782313',
  'rs1061170',
  'rs12979860',
  'rs1800562',
  'rs1799945',
  'rs1333049',
  'rs7903146',
  'rs5219',
  'rs1051730',
  'rs16969968',
  'rs1800629',
  'rs1800795',
  'rs231775',
  'rs6983267',
  'rs11209026',
  'rs601338',
  'rs1799990',
  'rs1800975',
  'rs2814778',
  'rs713598',
  'rs602662',
  'rs1726866',
  'rs1805007',
  'rs1805008',
  'rs1042602',
  'rs12203592',
  'rs16891982',
  'rs1393350',
  'rs17822931',
  'rs10427255',
  'rs2802292',
  'rs10757274',
  'rs10757278',
  'rs429358',
  'rs7412',
  'rs405509',
  'rs4420638',
  'rs9536314',
  'rs5882',
  'rs1800896',
  'rs2075650',
  'rs2234693',
  'rs9340799'
]);

console.log(`✅ Loaded ${analysisRsids.size} hardcoded rsids for DNA filtering`);

function filterDNAFile(fileContent) {
  
  const lines = fileContent.split('\n');
  const header = lines[0];
  const filteredLines = [header];
  
  let originalCount = 0;
  let filteredCount = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;
    
    originalCount++;
    const rsid = line.split(/[\t\s]+/)[0];
    
    if (analysisRsids.has(rsid)) {
      filteredLines.push(line);
      filteredCount++;
    }
  }
  
  const filteredContent = filteredLines.join('\n');
  const reduction = originalCount > 0 ? ((1 - filteredCount / originalCount) * 100).toFixed(1) : 0;
  
  console.log(`📊 DNA Filtering Complete:`);
  console.log(`   Original SNPs: ${originalCount.toLocaleString()}`);
  console.log(`   Filtered SNPs: ${filteredCount}`);
  console.log(`   Size reduction: ${reduction}%`);
  
  return {
    filteredContent,
    originalCount,
    filteredCount,
    reduction
  };
}


