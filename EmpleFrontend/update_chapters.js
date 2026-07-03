const fs = require('fs');
let content = fs.readFileSync('src/features/user/tutorials/java/data/javaTutorial.ts', 'utf8');

const contentReplacement = `             .forEach(System.out::println);
    }
}\`
  },
  packages: {
    title: "Packages in Java",
    description: "Learn how to group related classes.",
    sections: [
      { title: "Introduction to Packages", content: "A java package is a group of similar types of classes, interfaces and sub-packages. Packages can be built-in or user-defined. The import keyword is used to access classes from other packages." }
    ],
    code: \`import java.util.Scanner;\\n\\npublic class PackageDemo {\\n    public static void main(String[] args) {\\n        // Using the Scanner class from java.util package\\n        Scanner scanner = new Scanner(System.in);\\n        System.out.println("Enter your name:");\\n        String name = scanner.nextLine();\\n        System.out.println("Hello, " + name);\\n    }\\n}\`
  },
  modifiers: {
    title: "Access Modifiers",
    description: "Learn about public, private, protected, and default modifiers.",
    sections: [
      { title: "Access Modifiers", content: "Access modifiers in Java help to restrict the scope of a class, constructor, variable, method, or data member. The four types are: Default, Private, Protected, and Public." }
    ],
    code: \`public class ModifierDemo {\\n    private int privateVar = 10; // Only accessible within this class\\n    public int publicVar = 20; // Accessible anywhere\\n    protected int protectedVar = 30; // Accessible within package and subclasses\\n    int defaultVar = 40; // Accessible within the same package\\n}\`
  }
};`;

content = content.replace(/             \.forEach\(System\.out::println\);\n    \}\n\}`\n  \}\n\};/g, contentReplacement);

const mcqReplacement = `    {"q": "What is the purpose of \`Collectors.groupingBy()\`?", "options": ["To sort a list", "To group stream elements into a Map based on a classifier function", "To remove duplicate elements", "To convert a stream into an array"], "ans": 1, "explanation": "Collectors.groupingBy() is a terminal collector that partitions stream elements into a Map<K, List<T>>, grouping them according to a classification function applied to each element."}
  ],
  packages: [
    {"q": "Which keyword is used to declare a package in Java?", "options": ["import", "package", "namespace", "module"], "ans": 1, "explanation": "The 'package' keyword is used to declare that a class belongs to a specific package."},
    {"q": "What is the default package in Java if no package is declared? (Adapted from GATE CS 2004)", "options": ["java.lang", "Unnamed package", "java.util", "default"], "ans": 1, "explanation": "If no package is specified, the classes belong to an unnamed, default package."}
  ],
  modifiers: [
    {"q": "Which access modifier provides the widest accessibility in Java?", "options": ["public", "private", "protected", "default"], "ans": 0, "explanation": "The 'public' modifier allows a member to be accessed from any other class in any package."},
    {"q": "If a member has no access modifier specified, what is its scope? (Adapted from GATE IT 2008)", "options": ["Visible to all classes", "Visible only to subclasses", "Visible only within its own package", "Visible only within its own class"], "ans": 2, "explanation": "This is known as default or package-private access; the member is only visible to classes within the same package."}
  ]
};`;

content = content.replace(/    \{"q": "What is the purpose of `Collectors\.groupingBy\(\)`\?", "options": \["To sort a list", "To group stream elements into a Map based on a classifier function", "To remove duplicate elements", "To convert a stream into an array"\], "ans": 1, "explanation": "Collectors\.groupingBy\(\) is a terminal collector that partitions stream elements into a Map<K, List<T>>, grouping them according to a classification function applied to each element\."\}\n  \],\n\};/g, mcqReplacement);

const chapterTargetStr = '  { id: "java8", label: "15 · Streams & Lambdas" }\n];';
const chapterReplacementStr = '  { id: "java8", label: "15 · Streams & Lambdas" },\n  { id: "packages", label: "16 · Packages" },\n  { id: "modifiers", label: "17 · Access Modifiers" }\n];';

if (content.includes(chapterTargetStr)) {
  content = content.replace(chapterTargetStr, chapterReplacementStr);
} else {
  // Try replacement using a looser match (ignoring the dot char)
  content = content.replace(/  \{ id: "java8", label: "15 . Streams & Lambdas" \}\n\];/g, chapterReplacementStr);
}

fs.writeFileSync('src/features/user/tutorials/java/data/javaTutorial.ts', content);
console.log('Successfully updated javaTutorial.ts!');
