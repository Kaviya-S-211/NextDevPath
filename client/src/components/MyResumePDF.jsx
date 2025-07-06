// MyResumePDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 2,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 11,
    color: '#444',
    marginTop: 2,
  },
  contact: {
    fontSize: 9,
    marginBottom: 2,
  },
  subheading: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
});

const MyResumePDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={[styles.flexRow, { marginBottom: 10 }]}>
        {/* Left: Name & Role */}
        <View>
          <Text style={styles.name}>{formData.name || 'YOUR NAME HERE'}</Text>
          <Text style={styles.role}>Developer ~ Engineer</Text>
        </View>

        {/* Right: Contact */}
        <View>
          <Text style={styles.contact}>{formData.portfolio}</Text>
          <Text style={styles.contact}>{formData.email}</Text>
          <Text style={styles.contact}>{formData.phone}</Text>
          <Text style={styles.contact}>{formData.location}</Text>
          <Text style={styles.contact}>{formData.github}</Text>
          <Text style={styles.contact}>{formData.linkedin}</Text>
        </View>
      </View>

      {/* Summary & Skills */}
      <View style={[styles.flexRow, styles.section]}>
        {/* Summary */}
        <View style={{ width: '48%' }}>
          <Text style={styles.heading}>SUMMARY</Text>
          <Text>{formData.summary}</Text>
        </View>

        {/* Skills */}
        <View style={{ width: '48%' }}>
          <Text style={styles.heading}>SKILLS</Text>
          <Text>
            <Text style={styles.label}>Languages: </Text>
            {formData.languages}
          </Text>
          <Text>
            <Text style={styles.label}>Technologies: </Text>
            {formData.technologies}
          </Text>
        </View>
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.heading}>PROJECTS</Text>
        {(formData.projects || []).map((proj, i) => (
          <View key={i}>
            <Text style={{ fontWeight: 'bold' }}>{proj.title}</Text>
            <Text>{proj.technologies}</Text>
            <Text>{proj.description}</Text>
            <Text>{proj.github}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.heading}>EDUCATION</Text>
        {(formData.education || []).map((edu, i) => (
          <View key={i} className="mb-4 flex flex-col md:flex-row gap-3" >
            <Text>{edu.timeline}</Text>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{edu.title}</Text>
              <Text>{edu.school}</Text>
              <Text>{edu.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.heading}>EXPERIENCE</Text>
        {(formData.experience || []).map((exp, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <View style={styles.flexRow}>
              <Text>{exp.timeline}</Text>
              <Text>{exp.company}</Text>
            </View>
            <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text>
            {exp.description.split('\n\n').map((line, j) => (
              <Text key={j} style={styles.bullet}>• {line}</Text>
            ))}
            <Text>{exp.skills}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyResumePDF;
