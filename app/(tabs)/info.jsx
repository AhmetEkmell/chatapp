import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // İkonlar için ekleme

const InfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.iconTitleContainer}>
          <MaterialIcons name="info" size={24} color="#007bff" />
          <Text style={styles.title}>Uygulama Hakkında</Text>
        </View>
        <Text style={styles.content}>
          Bu uygulama, kullanıcıların belirledikleri bir socket IP adresine bağlanarak gerçek zamanlı
          mesajlaşma yapmalarını sağlar. Kullanıcı adı girişi yaptıktan sonra, farklı kanallara (room)
          katılarak diğer kullanıcılarla iletişim kurabilirsiniz.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconTitleContainer}>
          <MaterialIcons name="help-outline" size={24} color="#007bff" />
          <Text style={styles.title}>Nasıl Kullanılır?</Text>
        </View>
        <Text style={styles.content}>
          1. İlk olarak, uygulama ana ekranında bağlanmak istediğiniz socket IP adresini girin ve "Bağlan"
          düğmesine basın.{"\n"}
          2. Bağlantı sağlandıktan sonra bir kullanıcı adı belirleyin ve giriş yapın.{"\n"}
          3. Karşınıza çıkan kanal listesinden birini seçerek sohbete başlayabilirsiniz.{"\n"}
          4. Katıldığınız kanalda, diğer kullanıcılarla mesajlaşabilir ve canlı sohbet deneyimi
          yaşayabilirsiniz.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconTitleContainer}>
          <MaterialIcons name="star" size={24} color="#007bff" />
          <Text style={styles.title}>Özellikler</Text>
        </View>
        <Text style={styles.content}>
          - Gerçek zamanlı mesajlaşma.{"\n"}- Birden fazla kanal seçeneği.{"\n"}- Kullanıcıların yazıyor...
          durumunu görme özelliği.{"\n"}- Kullanıcı dostu arayüz ile kolay kullanım.{"\n"}- **Bildirim
          desteği:** Bir mesaj geldiğinde uygulama bildirim gösterir.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconTitleContainer}>
          <MaterialIcons name="target" size={24} color="#007bff" />
          <Text style={styles.title}>Amaç</Text>
        </View>
        <Text style={styles.content}>
          Bu uygulama, socket bağlantıları üzerinden hızlı iletişim ortamı oluşturmayı hedeflemektedir.
        </Text>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  iconTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});
