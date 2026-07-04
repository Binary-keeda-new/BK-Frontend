/**
 * 120 Days of Code Roadmap
 * Structured dynamically by phases in tabular format.
 */

// SVG original logos for practice platforms (LeetCode, Coding Ninjas, GeeksforGeeks)
const leetcodeSvg = `
<svg viewBox="0 0 94 111" width="18" height="18" fill="none" style="display:block;">
  <g id="LeetCode-Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <!-- Orange Loops (Top & Bottom) -->
    <path d="M67.5068339,83.0664138 C70.0005384,80.5763786 74.0371402,80.5828822 76.5228362,83.0809398 C79.0085322,85.5789975 79.00204,89.6226456 76.5083355,92.1126808 L65.4351451,103.169577 C55.2192332,113.370744 38.5604663,113.518673 28.1722578,103.513204 C28.112217,103.455678 23.486583,98.9201326 8.22702585,83.9570195 C-1.92478479,74.0028895 -2.93614945,58.0748736 6.61697549,47.8463644 L24.4286944,28.7745461 C33.9100043,18.6218594 51.3874487,17.5122246 62.2279907,26.2789232 L78.4052912,39.3620235 C81.1448956,41.5776292 81.5728103,45.5984975 79.3610655,48.3428842 C77.1493207,51.0872709 73.1354592,51.5159327 70.3958548,49.300327 L54.2186634,36.2173149 C48.5492813,31.6325105 38.631911,32.2621597 33.7398535,37.5006265 L15.9279056,56.5726899 C11.2772073,61.552182 11.7865613,69.5740156 17.1461283,74.8292186 C28.3515339,85.8169393 36.9874071,94.2846214 36.9973988,94.294225 C42.3981571,99.4959838 51.130862,99.418438 56.43358,94.1233737 L67.5068339,83.0664138 Z" fill="#FFA116" fill-rule="nonzero"/>
    <!-- Gray Middle Bar -->
    <path d="M40.6069914,72.0014117 C37.086019,72.0014117 34.2317068,69.142117 34.2317068,65.6149982 C34.2317068,62.0878794 37.086019,59.2285847 40.6069914,59.2285847 L87.6247154,59.2285847 C91.1456879,59.2285847 94,62.0878794 94,65.6149982 C94,69.142117 91.1456879,72.0014117 87.6247154,72.0014117 L40.6069914,72.0014117 Z" fill="#B3B3B3"/>
    <!-- White Left Bracket -->
    <path d="M49.4124315,2.02335002 C51.8178981,-0.552320454 55.852269,-0.686893945 58.4234511,1.72277172 C60.9946333,4.13243738 61.1289722,8.17385083 58.7235056,10.7495213 L15.9282277,56.5728697 C11.2773659,61.551984 11.7867168,69.5737689 17.1459309,74.8291832 L36.9094236,94.2091099 C39.4255514,96.6764051 39.4686234,100.719828 37.0056277,103.240348 C34.5426319,105.760868 30.5062548,105.804016 27.990127,103.33672 L8.22654289,83.9567041 C-1.92467414,74.0021005 -2.93603527,58.0741402 6.61751533,47.846311 L49.4124315,2.02335002 Z" fill="#FFFFFF"/>
  </g>
</svg>
`;

const codingNinjasSvg = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" style="display:block;">
  <circle cx="12" cy="12" r="10" fill="#F05123"/>
  <path d="M4 10h16v4H4z" fill="#1F1F1F"/>
  <ellipse cx="9" cy="12" rx="2" ry="1" fill="#FFFFFF"/>
  <ellipse cx="15" cy="12" rx="2" ry="1" fill="#FFFFFF"/>
  <circle cx="9" cy="12" r="0.7" fill="#000000"/>
  <circle cx="15" cy="12" r="0.7" fill="#000000"/>
</svg>
`;

const gfgSvg = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="#2F8D46" style="display:block;">
  <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z"/>
</svg>
`;

// Helper to generate the HTML table for each phase
const makePhaseTable = (phaseName: string, days: any[]) => {
  let rowsHtml = '';
  days.forEach((day: any) => {
    rowsHtml += `
      <tr style="border-bottom: 1px solid var(--border); transition: background-color 0.2s;">
        <!-- Column 1: Status Checkbox -->
        <td style="border: 1px solid var(--border); padding: 12px; text-align: center; vertical-align: middle; width: 8%;">
          <input type="checkbox" data-day="${day.day}" class="problem-checkbox" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--orange);" />
        </td>
        <!-- Column 2: Days (Separated & Centered) -->
        <td style="border: 1px solid var(--border); padding: 12px; font-weight: 700; color: var(--orange); text-align: center; vertical-align: middle; font-size: 14px; width: 10%;">
          Day ${day.day}
        </td>
        <!-- Column 3: Problem Description -->
        <td style="border: 1px solid var(--border); padding: 12px; color: var(--text); vertical-align: middle; line-height: 1.5; width: 42%;">
          ${day.title}
        </td>
        <!-- Column 4: Practice Links (LeetCode, Coding Ninjas, GFG - YouTube Button Removed) -->
        <td style="border: 1px solid var(--border); padding: 12px; text-align: center; vertical-align: middle; white-space: nowrap; width: 18%;">
          <div style="display: inline-flex; gap: 8px; justify-content: center; align-items: center;">
            <!-- LeetCode (Round Button) -->
            <a href="${day.leetcode}" target="_blank" rel="noopener noreferrer" title="LeetCode" style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background-color: var(--surface2); border: 1.5px solid var(--border); transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.1)';this.style.borderColor='#FFA116';this.style.boxShadow='0 0 8px rgba(255, 161, 22, 0.3)';" onmouseout="this.style.transform='scale(1)';this.style.borderColor='var(--border)';this.style.boxShadow='none';">
              ${leetcodeSvg}
            </a>
            <!-- Coding Ninjas (Round Button) -->
            <a href="${day.cn}" target="_blank" rel="noopener noreferrer" title="Coding Ninjas" style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background-color: var(--surface2); border: 1.5px solid var(--border); transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.1)';this.style.borderColor='#F05123';this.style.boxShadow='0 0 8px rgba(240, 81, 35, 0.3)';" onmouseout="this.style.transform='scale(1)';this.style.borderColor='var(--border)';this.style.boxShadow='none';">
              ${codingNinjasSvg}
            </a>
            <!-- GeeksforGeeks (Round Button) -->
            <a href="${day.gfg}" target="_blank" rel="noopener noreferrer" title="GeeksforGeeks" style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background-color: var(--surface2); border: 1.5px solid var(--border); transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.1)';this.style.borderColor='#2F8D46';this.style.boxShadow='0 0 8px rgba(47, 141, 70, 0.3)';" onmouseout="this.style.transform='scale(1)';this.style.borderColor='var(--border)';this.style.boxShadow='none';">
              ${gfgSvg}
            </a>
          </div>
        </td>
        <!-- Column 5: YouTube Explanation Link (Striver & Apna College Videos Only) -->
        <td style="border: 1px solid var(--border); padding: 12px; text-align: center; vertical-align: middle; width: 22%;">
          <a href="${day.ytLink}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; background: rgba(239, 68, 68, 0.1); border: 1.5px solid #ef4444; color: #ef4444; border-radius: 30px; text-decoration: none; font-weight: 700; transition: all 0.2s; font-size: 13px;" onmouseover="this.style.background='#ef4444';this.style.color='#fff';this.style.transform='scale(1.05)';" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)';this.style.color='#ef4444';this.style.transform='scale(1)';">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display: block;">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Video
          </a>
        </td>
      </tr>
    `;
  });

  return `
    <div style="overflow-x: auto; margin-top: 16px; border-radius: 12px; border: 1px solid var(--border);">
      <table style="width: 100%; border-collapse: collapse; font-family: inherit; font-size: 14px; text-align: left; background-color: var(--surface);">
        <thead>
          <tr style="background-color: var(--surface2); border-bottom: 2px solid var(--border);">
            <th style="border: 1px solid var(--border); padding: 12px; font-weight: 800; color: var(--text); width: 8%; text-align: center;">Status</th>
            <th style="border: 1px solid var(--border); padding: 12px; font-weight: 800; color: var(--text); width: 10%; text-align: center;">Day</th>
            <th style="border: 1px solid var(--border); padding: 12px; font-weight: 800; color: var(--text); width: 42%;">Problem Description</th>
            <th style="border: 1px solid var(--border); padding: 12px; font-weight: 800; color: var(--text); width: 18%; text-align: center;">Practice Links</th>
            <th style="border: 1px solid var(--border); padding: 12px; font-weight: 800; color: var(--text); width: 22%; text-align: center;">YouTube Explanation</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
};

// High-quality YouTube video IDs mapped to days (TakeUForward / Striver & Apna College only)
const ytVideoIds = {
  1: 't6zLJOCVqD0',
  2: '2xdzSOn7PgY',
  3: 'G80-j_xnE_8',
  4: '8wmn7k1TTcI',
  5: '13ocRMSJy5M',
  6: 'TbbSJrY5GqQ',
  7: '4iT-GhvSKzc',
  8: 'dSRFgEs3a6A',
  9: 'xcPFUCh0jT0',
  10: 'G80-j_xnE_8',
  11: '37E9ckMDdTk',
  12: '37E9ckMDdTk',
  13: 'twuC1F6gLI8',
  14: 'wvcQg43_V8U',
  15: '0LIctkgJ2hQ',
  16: 'bYWLJb3vCWY',
  17: 'wvcQg43_V8U',
  18: 'AHZpyENo7k4',
  19: 'n7uwj04E0I4',
  20: 'TW2m8m_FNJE',
  21: 'R5j8k9eYtcY',
  22: 'twuC1F6gLI8',
  23: 'rH-V02qaSJk',
  24: 'AWnBa91lThI',
  25: 'O-NosX-on5U',
  26: '4teL2-VxLO0',
  27: 'N5pRTLMz12s',
  28: 'UOgKdjeniAE',
  29: '-zSxTJkcdAo',
  30: 'vzdNOK2oB2E',
  31: 'KEs5UyBJ39g',
  32: '32Ll35mhWg0',
  33: 'UXDSeD9mN-k',
  34: 'wvcQg43_V8U',
  35: 'nP_ns3uSh80',
  36: 'ogTMIFPjNkQ',
  37: 'j48e8ac7r20',
  38: 'UXDSeD9mN-k',
  39: 'oO5uLE7EUlM',
  40: 'xvNwoz-ufXA',
  41: 'MHf6awe89xw',
  42: 'MHf6awe89xw',
  43: 'HGk_ypEuS24',
  44: 'Bsv3FPUX_BA',
  45: 'hjR1IYVx9lY',
  46: '5qGrJbHhqFs',
  47: 'nhEMDKMB44g',
  48: 'B2VqNmLZXoc',
  49: 'R_Mfw4ew-Vo',
  50: 'Z0hwjftStI4',
  51: 'HGk_ypEuS24',
  52: 'HGk_ypEuS24',
  53: 'HGk_ypEuS24',
  54: 'tp8JIuCXBaU',
  55: 'ogjf7ORKfd8',
  56: 'WIrA4YexLRQ',
  57: 'IexN60k62jo',
  58: 'ZSz4xsf5S70',
  59: 'vfsrJB_yfo0',
  60: 'bNuMPAuQN4g',
  61: 'MJcckSfoYdI',
  62: 'LKXEGTnQT88',
  63: '1xNbjMdbjug',
  64: 'g5Fuxn_AvSk',
  65: 'XV9-7oeb51I',
  66: 'qQd-ViW7bfk',
  67: 'LKXEGTnQT88',
  68: 'bBTvLACZBvk',
  69: 'K9VNSAx-Yqs',
  70: 'B3MfEX7gP2c',
  71: 'HTO8tSdYasg',
  72: 'nttpF8kwgd4',
  73: 'qQd-ViW7bfk',
  74: 'pBD4B1tzgVc',
  75: 'LqKaUv1G3_I',
  76: '_ANrF3FJm7I',
  77: 'Bfqd8BsPVuw',
  78: 'NzIGLLwZBS8',
  79: 'EoAsWbO7sqg',
  80: '_ANrF3FJm7I',
  81: 'u-yWemKGWO0',
  82: 'Rezetez59Nk',
  83: 'BhuvF_-PWS0',
  84: 'Yt50Jfbd8Po',
  85: '_-QHfMDde90',
  86: 'FiFiNvM29ps',
  87: 'KcNt6v_56cc',
  88: 'kouxiP_H5WE',
  89: '9TJYWh0adfk',
  90: 'f-sj7I5oXEI',
  91: '9TJYWh0adfk',
  92: 'b6Gq6V8Tvpg',
  93: 'NKJnHewiGdc',
  94: 'nJ6FdAIr_6g',
  95: 'ipeCcTNxZ1A',
  96: '-tgVpUgsQ5k',
  97: 'Qzf1a--rhp8',
  98: 'Gd92jSu_cZk',
  99: 'BPlrALf1LDU',
  100: 'ChxA6H2253I',
  101: 'LyuuqCVkP5I',
  102: 'R9PTBwOzceo',
  103: 'cg6JGiXhQ9c',
  104: 'wiOo4DC5GGA',
  105: '7LjQ57RqgEc',
  106: 'jXu-H7XuClE',
  107: 'u4FWXfgS8jw',
  108: 'GYptUgnIM_I',
  109: 'tqQ5fTamIN4',
  110: 'xwjS0iZhw4I',
  111: 'M6GnoUDpqEE',
  112: 'unqeUOAK4Os',
  113: 'RN1wzY_tnYU',
  114: 'tqQ5fTamIN4',
  115: 'tqQ5fTamIN4',
  116: '3kMKYQ2wNIU',
  117: 'lRY_G-u_8jk',
  118: 'e7XQLtOQM3I',
  119: 'NdDIaH91P0g',
  120: 'tlCEbnZsGXE',
};

// Custom slugs for Naukri Code360 (Coding Ninjas) direct links
const cnSlugs: Record<number, string> = {
  1: "function-to-print-hello-world_1164189",
  2: "sum-of-even-numbers-till-n_893205",
  3: "switch-case-statement_8357244",
  4: "search-insert-and-delete-in-an-array_1214539",
  5: "linear-search_6922070",
  6: "binary-search_972",
  7: "nth-fibonacci-number_1115780",
  8: "check-palindrome_4219630",
  9: "bubble-sort_980524",
  10: "ninja-s-calculator_1172220",
  11: "sum-of-array_1164287",
  12: "largest-element-in-the-array-largest-element-in-the-array_5026279",
  13: "reverse-the-array_1262298",
  14: "interview-shuriken-41-move-zeroes-to-end_240143",
  15: "contains-duplicate_6141355",
  16: "missing-number_6680467",
  17: "rotate-array_1230543",
  18: "maximum-subarray-sum_630526",
  19: "ninja-and-sorted-arrays_1214628",
  20: "product-of-array-except-self_630271",
  21: "count-vowels-consonants-and-spaces_5026361",
  22: "reverse-string_4605861",
  23: "check-palindrome_4219630",
  24: "longest-word-made-from-other-words_1229401",
  25: "anagram_40584",
  26: "first-unique-character-in-a-string_983606",
  27: "remove-duplicates-from-string_630470",
  28: "compress-the-string_526",
  29: "longest-substring-without-repeating-characters_758894",
  30: "group-anagrams_800285",
  31: "count-frequency-in-a-range_8365446",
  32: "find-duplicate-in-array_8289592",
  33: "two-sum_839653",
  34: "array-intersection_625161",
  35: "majority-element_842495",
  36: "isomorphic-strings-_1117636",
  37: "count-distinct-element-in-every-k-size-window_920336",
  38: "number-of-pairs-with-given-sum_1171154",
  39: "longest-consecutive-sequence_759408",
  40: "subarrays-with-sum-%E2%80%98k'_6922076",
  41: "linear-search_6922070",
  42: "binary-search_972",
  43: "algorithm-to-find-best-insert-position-in-sorted-array_839813",
  44: "square-root-integral_893351",
  45: "first-and-last-position-of-an-element-in-sorted-array_1082549",
  46: "search-in-rotated-sorted-array_1082554",
  47: "rotated-array_1093219",
  48: "find-peak-element_1081482",
  49: "aggressive-cows_1082559",
  50: "allocate-books_1090540",
  51: "bubble-sort_980524",
  52: "selection-sort_981162",
  53: "insertion-sort_3155179",
  54: "sort-an-array-of-0s-1s-and-2s_6929674",
  55: "merge-sort_920442",
  56: "quick-sort_983625",
  57: "merge-overlapping-intervals_1082151",
  58: "quicksort-using-the-dutch-national-flag-algorithm_873862",
  59: "minimum-number-of-swaps-required-to-sort-an-array_973251",
  60: "relative-sorting_982932",
  61: "check-prime_624934",
  62: "gcd_975284",
  63: "lcm_4604173",
  64: "count-primes_1062621",
  65: "modular-exponentiation_1082146",
  66: "power-of-two_893061",
  67: "count-set-bits_8162231",
  68: "even-or-odd_7463066",
  69: "swap-two-numbers_1112577",
  70: "find-unique_625159",
  71: "missing-number_6680467",
  72: "check-whether-k-th-bit-is-set-or-not_5026446",
  73: "bit-manipulation_8142533",
  74: "divide-two-integers_1112617",
  75: "subsets_1164447",
  76: "tree-traversal_981269",
  77: "tree-traversal_981269",
  78: "tree-traversal_981269",
  79: "level-order-traversal_796002",
  80: "height-of-binary-tree_4609628",
  81: "count-complete-binary-tree-nodes_1094892",
  82: "diameter-of-the-binary-tree_920552",
  83: "check-identical-trees_799364",
  84: "is-height-balanced-binary-tree_975497",
  85: "lca-of-binary-tree_920541",
  86: "insert-into-a-binary-search-tree_1279913",
  87: "search-in-bst_1402878",
  88: "delete-node-in-bst_920381",
  89: "minimum-element-in-bst_873130",
  90: "validate-bst_981275",
  91: "k-th-smallest-node-in-bst_920441",
  92: "min-heap-implementation_5480527",
  93: "convert-min-heap-to-max-heap_630293",
  94: "heap-sort_1262153",
  95: "k-largest-element_1062624",
  96: "bfs-in-graph_973002",
  97: "dfs-traversal_630462",
  98: "dijkstra-s-shortest-path_920469",
  99: "cycle-detection-in-undirected-graph_1062670",
  100: "topological-sort_982938",
  101: "insertion-in-a-singly-linked-list_4609646",
  102: "delete-node-in-a-linked-list_1105578",
  103: "reverse-linked-list_920513",
  104: "detect-cycle-in-a-singly-linked-list_981265",
  105: "middle-of-linked-list_973250",
  106: "merge-two-sorted-linked-lists_800332",
  107: "intersection-of-linked-list_630457",
  108: "stack-implementation-using-array_2432940",
  109: "implement-stack-with-linked-list_630475",
  110: "valid-parentheses_795104",
  111: "implement-queue-using-arrays_8390825",
  112: "circular-queue_1170058",
  113: "implement-queue-using-linked-list_8161235",
  114: "queue-using-stack_799482",
  115: "stack-using-queue_795152",
  116: "delete-kth-node-from-end_799912",
  117: "palindrome-linked-list_799352",
  118: "next-greater-element_670",
  119: "min-stack_3843990",
  120: "generate-binary-numbers_981264"
};

const getCNLink = (day: any) => {
  if (cnSlugs[day.day]) {
    return `https://www.naukri.com/code360/problems/${cnSlugs[day.day]}`;
  }
  const cleanTitle = encodeURIComponent(day.title.replace('Write a program to ', '').replace('implement ', '').replace('.', ''));
  return `https://www.naukri.com/code360/problems?search=${cleanTitle}`;
};

// Raw problems data
const rawDays = [
  // Phase 1: Programming Fundamentals
  { day: 1, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to print "Hello World".', leetcode: 'https://leetcode.com/problems/create-hello-world-function/', gfg: 'https://www.geeksforgeeks.org/c-hello-world-program/' },
  { day: 2, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to print even numbers between 1:100.', leetcode: 'https://leetcode.com/problemset/?search=print+even+numbers', gfg: 'https://www.geeksforgeeks.org/java-program-to-print-even-numbers-from-1-to-100/' },
  { day: 3, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to implement switch cases.', leetcode: 'https://leetcode.com/problems/fizz-buzz/', gfg: 'https://www.geeksforgeeks.org/switch-statement-cc/' },
  { day: 4, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to insert, delete and update elements in an array.', leetcode: 'https://leetcode.com/problems/remove-element/', gfg: 'https://www.geeksforgeeks.org/search-insert-and-delete-in-an-unsorted-array/' },
  { day: 5, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to implement linear search.', leetcode: 'https://leetcode.com/problemset/?search=linear+search', gfg: 'https://www.geeksforgeeks.org/linear-search/' },
  { day: 6, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to implement binary search.', leetcode: 'https://leetcode.com/problems/binary-search/', gfg: 'https://www.geeksforgeeks.org/binary-search/' },
  { day: 7, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to print fibonacci numbers up to \'N\'.', leetcode: 'https://leetcode.com/problems/fibonacci-number/', gfg: 'https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/' },
  { day: 8, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to check whether a string is palindrome or not.', leetcode: 'https://leetcode.com/problems/valid-palindrome/', gfg: 'https://www.geeksforgeeks.org/c-program-to-check-whether-a-given-string-is-palindrome-or-not/' },
  { day: 9, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to implement bubble sort.', leetcode: 'https://leetcode.com/problems/sort-an-array/', gfg: 'https://www.geeksforgeeks.org/bubble-sort-algorithm/' },
  { day: 10, phase: 'Phase 1: Programming Fundamentals', title: 'Write a program to develop a calculator using the switch keyword.', leetcode: 'https://leetcode.com/problems/basic-calculator/', gfg: 'https://www.geeksforgeeks.org/make-a-simple-calculator-in-c/' },

  // Phase 2: Array Fundamentals
  { day: 11, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to find the sum of all elements in an array.', leetcode: 'https://leetcode.com/problems/running-sum-of-1d-array/', gfg: 'https://www.geeksforgeeks.org/program-to-find-sum-of-elements-in-a-given-array/' },
  { day: 12, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to find the largest and smallest element in an array.', leetcode: 'https://leetcode.com/problems/third-maximum-number/', gfg: 'https://www.geeksforgeeks.org/program-to-find-largest-element-in-an-array/' },
  { day: 13, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to reverse an array.', leetcode: 'https://leetcode.com/problems/reverse-string/', gfg: 'https://www.geeksforgeeks.org/program-to-reverse-an-array/' },
  { day: 14, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to move all zeroes to the end of the array.', leetcode: 'https://leetcode.com/problems/move-zeroes/', gfg: 'https://www.geeksforgeeks.org/move-zeroes-end-array/' },
  { day: 15, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to check whether an array contains duplicate elements.', leetcode: 'https://leetcode.com/problems/contains-duplicate/', gfg: 'https://www.geeksforgeeks.org/check-given-array-contains-duplicate-elements-within-k-distance/' },
  { day: 16, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to find the missing number in an array containing numbers from 1 to N.', leetcode: 'https://leetcode.com/problems/missing-number/', gfg: 'https://www.geeksforgeeks.org/find-the-missing-number/' },
  { day: 17, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to rotate an array by K positions.', leetcode: 'https://leetcode.com/problems/rotate-array/', gfg: 'https://www.geeksforgeeks.org/array-rotation/' },
  { day: 18, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to find the maximum sum subarray using Kadane’s Algorithm.', leetcode: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/kadanes-algorithm/' },
  { day: 19, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to merge two sorted arrays into a single sorted array.', leetcode: 'https://leetcode.com/problems/merge-sorted-array/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-arrays/' },
  { day: 20, phase: 'Phase 2: Array Fundamentals', title: 'Write a program to find the product of array elements except self without using division.', leetcode: 'https://leetcode.com/problems/product-of-array-except-self/', gfg: 'https://www.geeksforgeeks.org/a-product-array-puzzle/' },

  // Phase 3: String Fundamentals
  { day: 21, phase: 'Phase 3: String Fundamentals', title: 'Write a program to count vowels and consonants in a string.', leetcode: 'https://leetcode.com/problems/determine-if-string-halves-are-alike/', gfg: 'https://www.geeksforgeeks.org/program-count-vowels-consonants-digits-special-characters-string/' },
  { day: 22, phase: 'Phase 3: String Fundamentals', title: 'Write a program to reverse a string.', leetcode: 'https://leetcode.com/problems/reverse-string/', gfg: 'https://www.geeksforgeeks.org/program-reverse-string-iterative-recursive/' },
  { day: 23, phase: 'Phase 3: String Fundamentals', title: 'Write a program to check whether a string is a palindrome.', leetcode: 'https://leetcode.com/problems/valid-palindrome/', gfg: 'https://www.geeksforgeeks.org/c-program-to-check-whether-a-given-string-is-palindrome-or-not/' },
  { day: 24, phase: 'Phase 3: String Fundamentals', title: 'Write a program to find the length of the longest word in a string.', leetcode: 'https://leetcode.com/problems/length-of-last-word/', gfg: 'https://www.geeksforgeeks.org/find-longest-word-dictionary-deleting-some-characters-given-string/' },
  { day: 25, phase: 'Phase 3: String Fundamentals', title: 'Write a program to check whether two strings are anagrams.', leetcode: 'https://leetcode.com/problems/valid-anagram/', gfg: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/' },
  { day: 26, phase: 'Phase 3: String Fundamentals', title: 'Write a program to find the first non-repeating character in a string.', leetcode: 'https://leetcode.com/problems/first-unique-character-in-a-string/', gfg: 'https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/' },
  { day: 27, phase: 'Phase 3: String Fundamentals', title: 'Write a program to remove duplicate characters from a string.', leetcode: 'https://leetcode.com/problems/remove-duplicate-letters/', gfg: 'https://www.geeksforgeeks.org/remove-duplicates-from-a-given-string/' },
  { day: 28, phase: 'Phase 3: String Fundamentals', title: 'Write a program to implement string compression.', leetcode: 'https://leetcode.com/problems/string-compression/', gfg: 'https://www.geeksforgeeks.org/run-length-encoding/' },
  { day: 29, phase: 'Phase 3: String Fundamentals', title: 'Write a program to find the longest substring without repeating characters.', leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', gfg: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/' },
  { day: 30, phase: 'Phase 3: String Fundamentals', title: 'Write a program to group all anagrams from a list of strings.', leetcode: 'https://leetcode.com/problems/group-anagrams/', gfg: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/' },

  // Phase 4: Hashing Fundamentals
  { day: 31, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to count the frequency of elements in an array using hashing.', leetcode: 'https://leetcode.com/problems/frequency-of-the-most-frequent-element/', gfg: 'https://www.geeksforgeeks.org/counting-frequencies-of-array-elements/' },
  { day: 32, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to find duplicate elements using HashSet.', leetcode: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/', gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/' },
  { day: 33, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to implement Two Sum using HashMap.', leetcode: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/' },
  { day: 34, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to find the intersection of two arrays.', leetcode: 'https://leetcode.com/problems/intersection-of-two-arrays/', gfg: 'https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays/' },
  { day: 35, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to find the majority element in an array.', leetcode: 'https://leetcode.com/problems/majority-element/', gfg: 'https://www.geeksforgeeks.org/majority-element/' },
  { day: 36, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to check whether two strings are isomorphic.', leetcode: 'https://leetcode.com/problems/isomorphic-strings/', gfg: 'https://www.geeksforgeeks.org/check-if-two-given-strings-are-isomorphic-to-each-other/' },
  { day: 37, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to count distinct elements in every window of size K.', leetcode: 'https://leetcode.com/problems/sliding-window-maximum/', gfg: 'https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/' },
  { day: 38, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to find all pairs with a given sum using hashing.', leetcode: 'https://leetcode.com/problems/max-number-of-k-sum-pairs/', gfg: 'https://www.geeksforgeeks.org/count-pairs-with-given-sum/' },
  { day: 39, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to find the length of the longest consecutive sequence.', leetcode: 'https://leetcode.com/problems/longest-consecutive-sequence/', gfg: 'https://www.geeksforgeeks.org/longest-consecutive-subsequence/' },
  { day: 40, phase: 'Phase 4: Hashing Fundamentals', title: 'Write a program to find the number of subarrays whose sum is equal to K.', leetcode: 'https://leetcode.com/problems/subarray-sum-equals-k/', gfg: 'https://www.geeksforgeeks.org/number-subarrays-sum-exactly-equal-k/' },

  // Phase 5: Searching Fundamentals
  { day: 41, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to implement Linear Search.', leetcode: 'https://leetcode.com/problemset/?search=linear+search', gfg: 'https://www.geeksforgeeks.org/linear-search/' },
  { day: 42, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to implement Binary Search.', leetcode: 'https://leetcode.com/problems/binary-search/', gfg: 'https://www.geeksforgeeks.org/binary-search/' },
  { day: 43, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to find the insertion position of an element in a sorted array.', leetcode: 'https://leetcode.com/problems/search-insert-position/', gfg: 'https://www.geeksforgeeks.org/search-insert-position-of-k-in-a-sorted-array/' },
  { day: 44, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to find the square root of a number using Binary Search.', leetcode: 'https://leetcode.com/problems/sqrtx/', gfg: 'https://www.geeksforgeeks.org/square-root-of-an-integer/' },
  { day: 45, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to find the first and last occurrence of an element in a sorted array.', leetcode: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', gfg: 'https://www.geeksforgeeks.org/first-and-last-occurrences-of-an-element-in-a-sorted-array/' },
  { day: 46, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to search an element in a rotated sorted array.', leetcode: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', gfg: 'https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/' },
  { day: 47, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to find the minimum element in a rotated sorted array.', leetcode: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', gfg: 'https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/' },
  { day: 48, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to find a peak element in an array.', leetcode: 'https://leetcode.com/problems/find-peak-element/', gfg: 'https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/' },
  { day: 49, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to solve the Aggressive Cows problem using Binary Search.', leetcode: 'https://leetcode.com/problems/magnetic-force-between-two-balls/', gfg: 'https://www.geeksforgeeks.org/aggressive-cows-problem/' },
  { day: 50, phase: 'Phase 5: Searching Fundamentals', title: 'Write a program to allocate a minimum number of pages using Binary Search.', leetcode: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', gfg: 'https://www.geeksforgeeks.org/allocate-minimum-number-pages/' },

  // Phase 6: Sorting Fundamentals
  { day: 51, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to implement Bubble Sort.', leetcode: 'https://leetcode.com/problems/sort-an-array/', gfg: 'https://www.geeksforgeeks.org/bubble-sort-algorithm/' },
  { day: 52, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to implement Selection Sort.', leetcode: 'https://leetcode.com/problems/sort-an-array/', gfg: 'https://www.geeksforgeeks.org/selection-sort-algorithm/' },
  { day: 53, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to implement Insertion Sort.', leetcode: 'https://leetcode.com/problems/insertion-sort-list/', gfg: 'https://www.geeksforgeeks.org/insertion-sort-algorithm/' },
  { day: 54, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to sort an array containing only 0s, 1s, and 2s.', leetcode: 'https://leetcode.com/problems/sort-colors/', gfg: 'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/' },
  { day: 55, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to implement Merge Sort.', leetcode: 'https://leetcode.com/problems/sort-an-array/', gfg: 'https://www.geeksforgeeks.org/merge-sort/' },
  { day: 56, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to implement Quick Sort.', leetcode: 'https://leetcode.com/problems/sort-an-array/', gfg: 'https://www.geeksforgeeks.org/quick-sort-algorithm/' },
  { day: 57, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to merge overlapping intervals.', leetcode: 'https://leetcode.com/problems/merge-intervals/', gfg: 'https://www.geeksforgeeks.org/merging-intervals/' },
  { day: 58, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to sort colors using the Dutch National Flag Algorithm.', leetcode: 'https://leetcode.com/problems/sort-colors/', gfg: 'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s-dutch-national-flag-algorithm/' },
  { day: 59, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to find the minimum number of swaps required to sort an array.', leetcode: 'https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/', gfg: 'https://www.geeksforgeeks.org/minimum-number-swaps-required-sort-array/' },
  { day: 60, phase: 'Phase 6: Sorting Fundamentals', title: 'Write a program to perform relative sorting of one array according to another array.', leetcode: 'https://leetcode.com/problems/relative-sort-array/', gfg: 'https://www.geeksforgeeks.org/relative-sorting/' },

  // Phase 7: Maths and Bit Manipulation
  { day: 61, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to check whether a number is prime or not.', leetcode: 'https://leetcode.com/problems/count-primes/', gfg: 'https://www.geeksforgeeks.org/prime-numbers/' },
  { day: 62, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to find the GCD (Greatest Common Divisor) of two numbers.', leetcode: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/', gfg: 'https://www.geeksforgeeks.org/program-to-find-gcd-or-hcf-of-two-numbers/' },
  { day: 63, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to find the LCM (Least Common Multiple) of two numbers.', leetcode: 'https://leetcode.com/problems/smallest-even-multiple/', gfg: 'https://www.geeksforgeeks.org/program-to-find-lcm-of-two-numbers/' },
  { day: 64, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to generate all prime numbers up to N using the Sieve of Eratosthenes.', leetcode: 'https://leetcode.com/problems/count-primes/', gfg: 'https://www.geeksforgeeks.org/sieve-of-eratosthenes/' },
  { day: 65, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to calculate the power of a number using fast exponentiation.', leetcode: 'https://leetcode.com/problems/powx-n/', gfg: 'https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/' },
  { day: 66, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to check whether a number is a power of 2 using bit manipulation.', leetcode: 'https://leetcode.com/problems/power-of-two/', gfg: 'https://www.geeksforgeeks.org/program-to-find-whether-a-no-is-power-of-two/' },
  { day: 67, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to count the number of set bits (1s) in the binary representation of a number.', leetcode: 'https://leetcode.com/problems/number-of-1-bits/', gfg: 'https://www.geeksforgeeks.org/count-set-bits-in-an-integer/' },
  { day: 68, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to find whether a number is odd or even using bitwise operators.', leetcode: 'https://leetcode.com/problemset/?search=odd+even', gfg: 'https://www.geeksforgeeks.org/check-if-a-number-is-odd-or-even-using-bitwise-operators/' },
  { day: 69, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to swap two numbers using XOR operation.', leetcode: 'https://leetcode.com/problemset/?search=swap+numbers', gfg: 'https://www.geeksforgeeks.org/swap-two-numbers-without-using-temporary-variable/' },
  { day: 70, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to find the only non-repeating element in an array where every other element appears twice.', leetcode: 'https://leetcode.com/problems/single-number/', gfg: 'https://www.geeksforgeeks.org/find-element-appears-once-array-every-element-appears-twice/' },
  { day: 71, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to find the missing number in an array using XOR.', leetcode: 'https://leetcode.com/problems/missing-number/', gfg: 'https://www.geeksforgeeks.org/find-the-missing-number/' },
  { day: 72, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to check whether the ith bit of a number is set or not.', leetcode: 'https://leetcode.com/problemset/?search=bit', gfg: 'https://www.geeksforgeeks.org/check-whether-k-th-bit-set-not/' },
  { day: 73, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to set, clear, and toggle the ith bit of a number.', leetcode: 'https://leetcode.com/problemset/?search=bit', gfg: 'https://www.geeksforgeeks.org/set-clear-and-toggle-a-given-bit-of-a-number/' },
  { day: 74, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to divide two numbers without using multiplication, division, or modulus operators.', leetcode: 'https://leetcode.com/problems/divide-two-integers/', gfg: 'https://www.geeksforgeeks.org/divide-two-integers-without-using-multiplication-division-mod-operator/' },
  { day: 75, phase: 'Phase 7: Maths and Bit Manipulation', title: 'Write a program to find all subsets of a set using bit manipulation.', leetcode: 'https://leetcode.com/problems/subsets/', gfg: 'https://www.geeksforgeeks.org/find-all-subsets-of-a-given-set-in-java/' },

  // Phase 8: Tree, BST & Heap
  { day: 76, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement Binary Tree traversal using Inorder Traversal.', leetcode: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', gfg: 'https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/' },
  { day: 77, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement Binary Tree traversal using Preorder Traversal.', leetcode: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', gfg: 'https://www.geeksforgeeks.org/preorder-tree-traversal-without-recursion/' },
  { day: 78, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement Binary Tree traversal using Postorder Traversal.', leetcode: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', gfg: 'https://www.geeksforgeeks.org/postorder-tree-traversal-without-recursion/' },
  { day: 79, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement Level Order Traversal of a Binary Tree.', leetcode: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', gfg: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
  { day: 80, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to find the height of a Binary Tree.', leetcode: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/' },
  { day: 81, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to count the total number of nodes in a Binary Tree.', leetcode: 'https://leetcode.com/problems/count-complete-tree-nodes/', gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-calculate-size-of-a-tree/' },
  { day: 82, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to find the diameter of a Binary Tree.', leetcode: 'https://leetcode.com/problems/diameter-of-binary-tree/', gfg: 'https://www.geeksforgeeks.org/diameter-of-a-binary-tree/' },
  { day: 83, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to check whether two Binary Trees are identical or not.', leetcode: 'https://leetcode.com/problems/same-tree/', gfg: 'https://www.geeksforgeeks.org/write-c-code-to-determine-if-two-trees-are-identical/' },
  { day: 84, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to check whether a Binary Tree is balanced or not.', leetcode: 'https://leetcode.com/problems/balanced-binary-tree/', gfg: 'https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/' },
  { day: 85, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to find the Lowest Common Ancestor (LCA) in a Binary Tree.', leetcode: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', gfg: 'https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/' },
  { day: 86, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement insertion in a Binary Search Tree (BST).', leetcode: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/' },
  { day: 87, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to search an element in a Binary Search Tree (BST).', leetcode: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/' },
  { day: 88, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to delete a node from a Binary Search Tree (BST).', leetcode: 'https://leetcode.com/problems/delete-node-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/' },
  { day: 89, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to find the minimum and maximum element in a BST.', leetcode: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/find-the-minimum-element-in-a-binary-search-tree/' },
  { day: 90, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to validate whether a Binary Tree is a Binary Search Tree or not.', leetcode: 'https://leetcode.com/problems/validate-binary-search-tree/', gfg: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/' },
  { day: 91, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to find the Kth smallest element in a BST.', leetcode: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', gfg: 'https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst/' },
  { day: 92, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement Min Heap operations.', leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/binary-heap/' },
  { day: 93, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to implement Max Heap operations.', leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/binary-heap/' },
  { day: 94, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to perform Heap Sort.', leetcode: 'https://leetcode.com/problems/sort-an-array/', gfg: 'https://www.geeksforgeeks.org/heap-sort/' },
  { day: 95, phase: 'Phase 8: Tree, BST & Heap', title: 'Write a program to find the K largest elements in an array using Heap.', leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', gfg: 'https://www.geeksforgeeks.org/k-largest-or-smallest-elements-in-an-array/' },

  // Phase 9: Graph
  { day: 96, phase: 'Phase 9: Graph', title: 'Write a program to implement Breadth First Search (BFS) traversal of a graph.', leetcode: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', gfg: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' },
  { day: 97, phase: 'Phase 9: Graph', title: 'Write a program to implement Depth First Search (DFS) traversal of a graph.', leetcode: 'https://leetcode.com/problems/all-paths-from-source-to-target/', gfg: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/' },
  { day: 98, phase: 'Phase 9: Graph', title: 'Write a program to find the shortest path in a graph using Dijkstra’s Algorithm.', leetcode: 'https://leetcode.com/problems/network-delay-time/', gfg: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' },
  { day: 99, phase: 'Phase 9: Graph', title: 'Write a program to detect a cycle in an undirected graph.', leetcode: 'https://leetcode.com/problems/redundant-connection/', gfg: 'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/' },
  { day: 100, phase: 'Phase 9: Graph', title: 'Write a program to perform Topological Sorting of a Directed Acyclic Graph (DAG).', leetcode: 'https://leetcode.com/problems/course-schedule-ii/', gfg: 'https://www.geeksforgeeks.org/topological-sorting/' },

  // Phase 10: Linked List, Stack and Queue
  { day: 101, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement insertion in a Singly Linked List.', leetcode: 'https://leetcode.com/problems/design-linked-list/', gfg: 'https://www.geeksforgeeks.org/linked-list-set-2-inserting-a-node/' },
  { day: 102, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement deletion in a Singly Linked List.', leetcode: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', gfg: 'https://www.geeksforgeeks.org/linked-list-set-3-deleting-node/' },
  { day: 103, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to reverse a Singly Linked List.', leetcode: 'https://leetcode.com/problems/reverse-linked-list/', gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' },
  { day: 104, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to detect a cycle in a Linked List.', leetcode: 'https://leetcode.com/problems/linked-list-cycle/', gfg: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
  { day: 105, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to find the middle element of a Linked List.', leetcode: 'https://leetcode.com/problems/middle-of-the-linked-list/', gfg: 'https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-given-linked-list/' },
  { day: 106, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to merge two sorted Linked Lists.', leetcode: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/' },
  { day: 107, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to find the intersection point of two Linked Lists.', leetcode: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', gfg: 'https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/' },
  { day: 108, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Stack using Arrays.', leetcode: 'https://leetcode.com/problems/implement-stack-using-queues/', gfg: 'https://www.geeksforgeeks.org/stack-data-structure-introduction-program/' },
  { day: 109, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Stack using Linked List.', leetcode: 'https://leetcode.com/problems/implement-stack-using-queues/', gfg: 'https://www.geeksforgeeks.org/implement-a-stack-using-singly-linked-list/' },
  { day: 110, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to check balanced parentheses using Stack.', leetcode: 'https://leetcode.com/problems/valid-parentheses/', gfg: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/' },
  { day: 111, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Queue using Arrays.', leetcode: 'https://leetcode.com/problems/implement-queue-using-stacks/', gfg: 'https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/' },
  { day: 112, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Circular Queue.', leetcode: 'https://leetcode.com/problems/design-circular-queue/', gfg: 'https://www.geeksforgeeks.org/circular-queue-set-1-introduction-array-implementation/' },
  { day: 113, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Queue using Linked List.', leetcode: 'https://leetcode.com/problems/implement-queue-using-stacks/', gfg: 'https://www.geeksforgeeks.org/queue-set-2-linked-list-implementation/' },
  { day: 114, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Queue using Stack.', leetcode: 'https://leetcode.com/problems/implement-queue-using-stacks/', gfg: 'https://www.geeksforgeeks.org/queue-using-stacks/' },
  { day: 115, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Stack using Queue.', leetcode: 'https://leetcode.com/problems/implement-stack-using-queues/', gfg: 'https://www.geeksforgeeks.org/implement-stack-using-queue/' },
  { day: 116, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to remove the Nth node from the end of a Linked List.', leetcode: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', gfg: 'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/' },
  { day: 117, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to check whether a Linked List is palindrome or not.', leetcode: 'https://leetcode.com/problems/palindrome-linked-list/', gfg: 'https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/' },
  { day: 118, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Next Greater Element using Stack.', leetcode: 'https://leetcode.com/problems/next-greater-element-i/', gfg: 'https://www.geeksforgeeks.org/next-greater-element/' },
  { day: 119, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to implement Min Stack with getMin() operation in constant time.', leetcode: 'https://leetcode.com/problems/min-stack/', gfg: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/' },
  { day: 120, phase: 'Phase 10: Linked List, Stack and Queue', title: 'Write a program to generate binary numbers from 1 to N using Queue.', leetcode: 'https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/', gfg: 'https://www.geeksforgeeks.org/interesting-method-generate-binary-numbers-1-n/' }
];

// Map over rawDays to enrich with CN and YouTube links (Striver & Apna College only)
const allDays = rawDays.map((day: any) => {
  const cleanTitle = day.title
    .replace('Write a program to ', '')
    .replace('implement ', '')
    .replace('develop a ', '')
    .replace('check whether a ', '')
    .replace('check whether ', '')
    .replace('check ', '')
    .replace('find the ', '')
    .replace('find ', '')
    .replace('.', '');

  // Phase 1 (Days 1-10) uses Apna College. Phases 2-10 (Days 11-120) use Striver (takeUforward)
  const channel = day.day <= 10 ? 'apna college' : 'striver';
  const query = `${channel} ${cleanTitle}`;
  const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  const videoId = ytVideoIds[day.day as keyof typeof ytVideoIds];
  const ytLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : ytSearchUrl;

  return {
    ...day,
    cn: getCNLink(day),
    ytLink: ytLink
  };
});

// Helper to filter allDays and get content for a phase
const getPhaseContent = (phaseName: string) => {
  const phaseDays = allDays.filter(d => d.phase === phaseName);
  return makePhaseTable(phaseName, phaseDays);
};

// Map each phase to a section
const sections = [
  {
    id: 1,
    week: 'Phase 1',
    title: 'Programming Fundamentals',
    points: 100,
    duration: 'Days 1-10',
    objectives: [
      'Understand basic control flow & recursion',
      'Implement switch-case structures',
      'Perform basic insertion/deletion in arrays',
      'Implement simple linear & binary search',
      'Learn basic sorting like bubble sort'
    ],
    content: getPhaseContent('Phase 1: Programming Fundamentals')
  },
  {
    id: 2,
    week: 'Phase 2',
    title: 'Array Fundamentals',
    points: 100,
    duration: 'Days 11-20',
    objectives: [
      'Master array manipulation & reversing',
      'Understand the two-pointer technique (reversing, shifting)',
      'Learn Kadane\'s Algorithm for maximum sum subarray',
      'Rotate arrays and solve product of array except self'
    ],
    content: getPhaseContent('Phase 2: Array Fundamentals')
  },
  {
    id: 3,
    week: 'Phase 3',
    title: 'String Fundamentals',
    points: 100,
    duration: 'Days 21-30',
    objectives: [
      'Understand string traversal and parsing',
      'Count patterns (vowels/consonants) in strings',
      'Solve problems on anagrams and palindromes',
      'Implement string compression and sliding window substrings'
    ],
    content: getPhaseContent('Phase 3: String Fundamentals')
  },
  {
    id: 4,
    week: 'Phase 4',
    title: 'Hashing Fundamentals',
    points: 100,
    duration: 'Days 31-40',
    objectives: [
      'Use HashMaps and HashSets for O(1) lookups',
      'Find frequency counts & duplicates in arrays',
      'Solve Two Sum and array intersections',
      'Perform sliding window distinct counts and subarray sums'
    ],
    content: getPhaseContent('Phase 4: Hashing Fundamentals')
  },
  {
    id: 5,
    week: 'Phase 5',
    title: 'Searching Fundamentals',
    points: 100,
    duration: 'Days 41-50',
    objectives: [
      'Understand linear search vs binary search complexity',
      'Apply binary search to sorted array insert/occurrences',
      'Search in rotated sorted arrays',
      'Solve optimization problems using binary search on answer space'
    ],
    content: getPhaseContent('Phase 5: Searching Fundamentals')
  },
  {
    id: 6,
    week: 'Phase 6',
    title: 'Sorting Fundamentals',
    points: 100,
    duration: 'Days 51-60',
    objectives: [
      'Understand O(N^2) sorting vs O(N log N) sorting',
      'Implement Bubble, Selection, Insertion, Merge, and Quick Sort',
      'Apply Dutch National Flag algorithm for 3-way partitioning',
      'Solve overlapping intervals and relative sorting'
    ],
    content: getPhaseContent('Phase 6: Sorting Fundamentals')
  },
  {
    id: 7,
    week: 'Phase 7',
    title: 'Maths and Bit Manipulation',
    points: 150,
    duration: 'Days 61-75',
    objectives: [
      'Implement primality tests & Sieve of Eratosthenes',
      'Learn fast exponentiation & modular arithmetic',
      'Apply bitwise operators (AND, OR, XOR, shifts)',
      'Count set bits, toggle bits, and generate subsets'
    ],
    content: getPhaseContent('Phase 7: Maths and Bit Manipulation')
  },
  {
    id: 8,
    week: 'Phase 8',
    title: 'Tree, BST & Heap',
    points: 200,
    duration: 'Days 76-95',
    objectives: [
      'Implement Binary Tree traversals (DFS & BFS/Level-order)',
      'Calculate tree properties (height, depth, diameter, size)',
      'Search, insert, delete, and validate Binary Search Trees',
      'Understand heap properties & implement Heap Sort'
    ],
    content: getPhaseContent('Phase 8: Tree, BST & Heap')
  },
  {
    id: 9,
    week: 'Phase 9',
    title: 'Graph',
    points: 100,
    duration: 'Days 96-100',
    objectives: [
      'Represent graphs using adjacency lists/matrices',
      'Traverse graphs using BFS and DFS',
      'Find shortest paths using Dijkstra\'s Algorithm',
      'Detect cycles and perform Topological Sorting'
    ],
    content: getPhaseContent('Phase 9: Graph')
  },
  {
    id: 10,
    week: 'Phase 10',
    title: 'Linked List, Stack and Queue',
    points: 150,
    duration: 'Days 101-120',
    objectives: [
      'Implement insert/delete operations in a Singly Linked List',
      'Reverse linked lists & detect cycles',
      'Understand Stack & Queue LIFO/FIFO structures',
      'Solve valid parentheses, Min Stack, Next Greater Element'
    ],
    content: getPhaseContent('Phase 10: Linked List, Stack and Queue')
  }
];

export const daysOfCodeRoadmap = {
  id: '120-days-of-code',
  title: '120 Days of Code',
  description: 'Master Data Structures & Algorithms step-by-step over 120 days. Divided into 10 fundamental phases with curated coding problems, YouTube videos, and solutions.',
  difficulty: 'Intermediate',
  icon: '💻',
  color: '#F15A22',
  domain: 'DSA & Algorithms',
  category: 'Technical',
  enrolled: 1540,
  targetUsers: ['Global BK', 'Campus'],
  durations: {
    '4months': { 
      label: '4 Months (120 Days)', 
      tagline: '120 Days of consistency and coding practice', 
      weeks: 16, 
      totalPoints: 1200, 
      sections: sections 
    },
    '4 months': { 
      label: '4 Months (120 Days)', 
      tagline: '120 Days of consistency and coding practice', 
      weeks: 16, 
      totalPoints: 1200, 
      sections: sections 
    }
  }
};

const getDaysOfCodeRoadmap = () => daysOfCodeRoadmap;
export default getDaysOfCodeRoadmap;
