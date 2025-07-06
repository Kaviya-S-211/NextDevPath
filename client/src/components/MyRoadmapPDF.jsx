import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "1 solid #e5e7eb",
  },
  title: {
    fontSize: 20,
    color: "#1d4ed8", // Tailwind blue-700
    fontWeight: "bold",
    marginBottom: 12,
  },
  domainName: {
    fontSize: 16,
    color: "#111827", // gray-900
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    color: "#374151", // gray-700
    marginBottom: 12,
  },
  heading: {
    fontSize: 13,
    color: "#059669", // Tailwind green-600
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletItem: {
    marginBottom: 4,
    paddingLeft: 8,
    textIndent: -8,
    color: "#1f2937", // gray-800
  },
});

export default function MyRoadmapPDF({ roadmap }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Recommended Domains & Roadmaps</Text>

        {roadmap.domains.map((domain, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.domainName}>{domain.name}</Text>
            <Text style={styles.description}>{domain.why}</Text>

            <Text style={styles.heading}>Learning Roadmap</Text>
            <View style={styles.bulletList}>
              {domain.roadmap.map((step, i) => (
                <Text key={i} style={styles.bulletItem}>• {step}</Text>
              ))}
            </View>

            <Text style={styles.heading}>Projects to Build</Text>
            <View style={styles.bulletList}>
              {domain.projectIdeas.map((proj, i) => (
                <Text key={i} style={styles.bulletItem}>• {proj}</Text>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
