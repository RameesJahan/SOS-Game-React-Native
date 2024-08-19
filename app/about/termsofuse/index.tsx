import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const TermsOfUse = () => {
  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Terms of Use for SOS Game</Text>

            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.paragraph}>
              By using the SOS game, you agree to comply with these Terms of Use.
              If you do not agree to these terms, please do not use the game.
            </Text>

            <Text style={styles.sectionTitle}>2. License</Text>
            <Text style={styles.paragraph}>
              Kaakka Apps grants you a non-exclusive, non-transferable, revocable
              license to use the SOS game for personal, non-commercial purposes.
              You may not use the game for any illegal or unauthorized purpose.
            </Text>

            <Text style={styles.sectionTitle}>3. Ownership</Text>
            <Text style={styles.paragraph}>
              All intellectual property rights in the SOS game, including but not
              limited to design, graphics, and code, are owned by Kaakka Apps,
              except for the background image and music, which are used under
              license from third-party providers.
            </Text>

            <Text style={styles.sectionTitle}>4. Third-Party Content</Text>
            <Text style={styles.paragraph}>
              The SOS game uses a free background image from Freepik and free
              background music from Flush Why. These third-party assets are used
              under their respective licenses, and you agree to abide by any
              applicable terms from these providers.
            </Text>

            <Text style={styles.sectionTitle}>5. User Content</Text>
            <Text style={styles.paragraph}>
              The SOS game allows you to add a nickname, which is stored locally
              on your device. You are solely responsible for the content you
              create and add to the game. Kaakka Apps does not have access to or
              control over this content.
            </Text>

            <Text style={styles.sectionTitle}>6. Prohibited Conduct</Text>
            <Text style={styles.paragraph}>
              You agree not to:
              {"\n"}- Use the game for any unlawful purpose.
              {"\n"}- Exploit the game for commercial purposes without our prior
              written consent.
              {"\n"}- Attempt to interfere with the game’s functionality or
              security.
            </Text>

            <Text style={styles.sectionTitle}>7. Disclaimer of Warranties</Text>
            <Text style={styles.paragraph}>
              The SOS game is provided "as is" without any warranties of any kind,
              either express or implied. Kaakka Apps does not guarantee that the
              game will be error-free, uninterrupted, or free of harmful
              components.
            </Text>

            <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
              Kaakka Apps shall not be liable for any damages arising from the use
              or inability to use the SOS game, including but not limited to
              direct, indirect, incidental, or consequential damages.
            </Text>

            <Text style={styles.sectionTitle}>9. Termination</Text>
            <Text style={styles.paragraph}>
              Kaakka Apps reserves the right to terminate or suspend your access
              to the SOS game at any time, without notice, for conduct that
              violates these Terms of Use or is otherwise harmful to other users
              or Kaakka Apps.
            </Text>

            <Text style={styles.sectionTitle}>10. Changes to the Terms</Text>
            <Text style={styles.paragraph}>
              We may update these Terms of Use from time to time to reflect
              changes in the game or legal requirements. If we make changes, we
              will notify you by updating the game through the app stores.
              Continued use of the game after any such updates indicates your
              acceptance of the new terms.
            </Text>

            <Text style={styles.sectionTitle}>11. Governing Law</Text>
            <Text style={styles.paragraph}>
              These Terms of Use are governed by and construed in accordance with
              the laws of Kerala, India, without regard to its conflict of law
              principles.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
    paddingBottom: 12,
  },
});

export default TermsOfUse;
