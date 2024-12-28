import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";

const Info = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Uygulama Hakkında</Text>
        <Text style={styles.content}>
          Bu uygulama, kullanıcıların belirledikleri bir socket IP adresine bağlanarak gerçek zamanlı
          mesajlaşma yapmalarını sağlar. Kullanıcı adı girişi yaptıktan sonra, farklı kanallara (room)
          katılarak diğer kullanıcılarla iletişim kurabilirsiniz.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Nasıl Kullanılır?</Text>
        <Text style={styles.content}>
          1. İlk olarak uygulama ana ekranında, bağlanmak istediğiniz socket IP adresini girin ve "Bağlan"
          düğmesine basın.{"\n"}
          2. Bağlantı sağlandıktan sonra bir kullanıcı adı belirleyin ve giriş yapın.{"\n"}
          3. Karşınıza çıkan kanal listesinden birini seçerek sohbete başlayabilirsiniz.{"\n"}
          4. Katıldığınız kanalda, diğer kullanıcılarla mesajlaşabilir ve canlı sohbet deneyimi
          yaşayabilirsiniz.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Özellikler</Text>
        <Text style={styles.content}>
          - Gerçek zamanlı mesajlaşma.{"\n"}- Birden fazla kanal seçeneği.{"\n"}- Kullanıcıların yazıyor...
          durumunu görme özelliği.{"\n"}- Kullanıcı dostu arayüz ile kolay kullanım.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Amaç</Text>
        <Text style={styles.content}>
          Bu uygulama, socket bağlantıları üzerinden hızlı iletişim ortamı oluşturmayı hedeflemektedir.
          Özellikle ekip içi iletişim veya topluluklarla hızlı bilgi paylaşımı için idealdir. Lütfen hassas
          bilgilerinizi mesaj içeriklerinde iletmeyiniz :))
        </Text>
      </View>
    </ScrollView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#22292e",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});
