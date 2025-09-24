import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        {/* Información principal */}
        <View style={styles.section}>
          <ThemedText style={styles.companyName}>ADOPTAFÁCIL</ThemedText>
          <ThemedText style={styles.description}>
            Conectando mascotas con hogares amorosos desde 2023
          </ThemedText>
        </View>

        {/* Contacto */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Contacto</ThemedText>
          <ThemedText style={styles.contactInfo}>
            info@adoptafacil.com
          </ThemedText>
          <ThemedText style={styles.contactInfo}>+1 234 567 890</ThemedText>
        </View>

        {/* Redes sociales */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Síguenos</ThemedText>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <ThemedText style={styles.socialText}>FB</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <ThemedText style={styles.socialText}>IG</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <ThemedText style={styles.socialText}>TW</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Copyright */}
      <View style={styles.copyright}>
        <ThemedText style={styles.copyrightText}>
          © 2023 Adoptafácil. Todos los derechos reservados
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0d0a24ff",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerContent: {
    flexDirection: "column",
    gap: 25,
  },
  section: {
    marginBottom: 15,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8d929aff",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#8d929aff",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8d929aff",
    marginBottom: 10,
  },
  link: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 8,
    paddingVertical: 2,
  },
  contactInfo: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 5,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 10,
  },
  socialButton: {
    width: 35,
    height: 35,
    backgroundColor: "#e2e8f0",
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    color: "#4a5568",
    fontSize: 12,
    fontWeight: "bold",
  },
  copyright: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 12,
    color: "#a0aec0",
    textAlign: "center",
  },
});
