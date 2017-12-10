function getToken() {
  return localStorage.getItem('userToken')
}

export function getUserInfo() {
  const token = getToken();
  return $.ajax({
    url: "http://api.qb.604.ru/user",
    method: "GET",
    headers: {"X-Auth-Token": token}
  })
}

export function getNotifications() {
  const token = getToken();
  return $.ajax({
    url: "http://api.qb.604.ru/notification",
    method: "GET",
    headers: {"X-Auth-Token": token}
  })
}

export function getOrders() {
  const token = getToken();
  return $.ajax({
    url: "http://api.qb.604.ru/notification",
    method: "GET",
    headers: {"X-Auth-Token": token}
  })
}
