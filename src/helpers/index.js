import axios from "axios";

export async function addMessage(target, message) {
  axios.get(`https://api.ipdata.co/?api-key=${process.env.VUE_APP_IP_API_KEY}`)
    .then((res) => {
      const message_id = Date.now()
      axios.post(`${process.env.VUE_APP_API_URL}/messages`, {
        data: {
          target,
          message,
          sender: res.data.ip,
          social: 0,
          infos: { ...res.data },
          message_id: `${message_id}`

        }
      })
    })
}

export function getIp() {
  axios.get(`https://api.ipdata.co/?api-key=${process.env.VUE_APP_IP_API_KEY}`)
    .then((res) => {
      // handle success
      return res.data
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
}

