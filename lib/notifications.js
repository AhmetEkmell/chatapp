import * as Notifications from "expo-notifications";

export async function prepareNotifications() {
  await registerForPushNotificationsAsync();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = newStatus;
  }

  if (finalStatus !== "granted") {
    alert("Bildirim izni alınamadı!");
  }
}
