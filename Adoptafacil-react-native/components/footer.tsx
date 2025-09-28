import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";

export default function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
    >
      <View style={styles.footerContent}>
        {/* Información principal */}
        <View style={styles.mainSection}>
          <ThemedText style={styles.companyName}>ADOPTAFÁCIL</ThemedText>
          <ThemedText style={styles.description}>
            Conectando mascotas con hogares amorosos
          </ThemedText>
        </View>

        {/* Contacto y Redes sociales en fila */}
        <View style={styles.bottomSections}>
          <View style={styles.contactSection}>
            <ThemedText style={styles.sectionTitle}>Contacto</ThemedText>
            <ThemedText style={styles.contactInfo}>
              info@adoptafacil.com
            </ThemedText>
            <ThemedText style={styles.contactInfo}>+1 234 567 890</ThemedText>
          </View>

          <View style={styles.socialSection}>
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
      </View>

      {/* Copyright */}
      <View style={styles.copyright}>
        <ThemedText style={styles.copyrightText}>
          © 2025 Adoptafácil. Todos los derechos reservados
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0d0a24ff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerContent: {
    gap: 20,
  },
  mainSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  bottomSections: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
  },
  contactSection: {
    flex: 1,
  },
  socialSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8d929aff",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    color: "#8d929aff",
    lineHeight: 18,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8d929aff",
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 4,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 8,
  },
  socialButton: {
    width: 30,
    height: 30,
    backgroundColor: "#e2e8f0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    color: "#4a5568",
    fontSize: 10,
    fontWeight: "bold",
  },
  copyright: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#2d3748",
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 10,
    color: "#a0aec0",
    textAlign: "center",
  },
});
