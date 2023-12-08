class AlertNotify {
  constructor(_timeOut = 10000, position = "center") {
    this.alertTimeout = _timeOut;
    this.notifyBox = document.createElement("div");
    this.modalBox = document.createElement("div");
    this.modalBox.setAttribute("id", "nonny-modal-box");
    this.notifyBox.setAttribute("id", "notification-box-of-boxes");
    this.timeoutId = null;
    if (!this.notifyBox) throw new Error("No Container found");

    if (!Number.isInteger(this.alertTimeout))
      throw new Error("timing must be number");

    if (typeof position !== "string")
      throw new Error("position must be a string");

    const positionArray = Array(
      "center",
      "bottom-center",
      "bottom-right",
      "bottom-left",
      "top-center",
      "top-left",
      "top-right"
    );

    if (!positionArray.includes(position.toLowerCase()))
      throw new Error(
        "position property is invalid choose between: center,bottom-center,bottom-right,bottom-left,top-center,top-left,top-right"
      );
    this.position = position;
    if (this.position == "top-right")
      this.placement = "right: 2%; top: 2%; z-index:1000000";
    if (this.position == "top-left")
      this.placement = "left: 2%; top: 2%; z-index:1000000";
    if (this.position == "top-center")
      this.placement =
        "top: 4%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
    if (this.position == "center")
      this.placement =
        "top: 50%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
    if (this.position == "bottom-left")
      this.placement = "left: 2%; bottom: 2%; z-index:1000000";
    if (this.position == "bottom-right")
      this.placement = "right: 2%; bottom: 2%; z-index:1000000";
    if (this.position == "bottom-center")
      this.placement =
        "bottom: 5%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
    this.notifyBox.addEventListener("click", (e) => {
      e.preventDefault();
      this.hideOnClick();
    });
    this.hideModal();
  }

  alert_message(msg = "", type = "", use = "fixed-modal") {
    const msgBox = `${msg}`;
    if (use == "fixed-modal") {
      switch (type) {
        case "success":
          document.body.appendChild(this.modalBox);
          this.modalBox.innerHTML = ` 
         <div class="modal-div">
         <i style="background:#23c55e;color:#000">&check;</i>
         <h2>Success!</h2>
         <p>
           ${msg}
         </p>
         <button class="close-nonny-modal" style="background:#23c55e;color:#000">Okay!</button>
       </div>`;
          this.showModal();
          break;
        case "warning":
          document.body.appendChild(this.modalBox);
          this.modalBox.innerHTML = ` 
         <div class="modal-div">
         <i style="background:#feb601;color:#000">&#x26A0;</i>
         <h2>Warning!</h2>
         <p>
           ${msg}
         </p>
         <button class="close-nonny-modal" style="background:#feb601;color:#000">Okay!</button>
       </div>`;
          this.showModal();
          break;
        case "info":
          document.body.appendChild(this.modalBox);
          this.modalBox.innerHTML = ` 
           <div class="modal-div">
           <i style="background:hsl(241, 93%, 29%);color:#fff;">&#9432;</i>
           <h2>Info!</h2>
           <p>
             ${msg}
           </p>
           <button class="close-nonny-modal" style="background:hsl(241, 93%, 29%);color:#fff;">Okay!</button>
         </div>`;
          this.showModal();
          break;
        case "danger":
          document.body.appendChild(this.modalBox);
          this.modalBox.innerHTML = ` 
           <div class="modal-div">
           <i style="background:#eb5f51;color:#000;">&times;</i>
           <h2>Danger!</h2>
           <p>
             ${msg}
           </p>
           <button class="close-nonny-modal" style="background:#eb5f51;color:#000;">Okay!</button>
         </div>`;
          this.showModal();
          break;
        default:
          document.body.appendChild(this.modalBox);
          this.modalBox.innerHTML = ` 
         <div class="modal-div">
         <i style="background:#24282f;color#fff;">&#63;</i>
         <h2>Default!</h2>
         <p>
           ${msg}
         </p>
         <button class="close-nonny-modal" style="background:#24282f;color#fff;">Okay!</button>
       </div>`;
          this.showModal();
          break;
      }
    } else if (use == "positioned-modal") {
      let alertLoader = "";
      switch (type) {
        case "success":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;background: #23c55e; color: #000;max-width:400px;padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement}; border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;gap:1rem;`;
          this.notifyBox.innerHTML = `<b style="display:flex;justify-content:center;align-items:center;width:30px;height:30px; border-radius:50%;background:#fff;color:#000;font-weight:800">&check;</b><p style="flex:1;width:-moz-fit-content;width:fit-content; padding:0 0 6px 0; color: inherit;font-size:18px;font-weight:500;line-height:20px;cursor:pointer;">${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id", "alertLoader");
          alertLoader.style =
            "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        case "danger":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;background: #f44336;display:flex;flex-wrap:wrap;justify-content:center;align-items:center; max-width:400px; color: #fff;padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};border: 2px solid #ddd; word-wrap:break-word;cursor:pointer;gap:1rem`;
          this.notifyBox.innerHTML = `<b style="display:flex;justify-content:center;align-items:center;width:30px;height:30px; border-radius:50%;background:#fff;color:#000;font-weight:800">&times;</b><p style="flex:1;width:fit-content; padding:0 0 6px 0; color: inherit;font-size:18px;font-weight:500;line-height:20px;cursor:pointer;"> ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id", "alertLoader");
          alertLoader.style =
            "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        case "warning":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;max-width:400px;background: #feb601; color: #000;padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19); ${this.placement};border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;gap:1rem`;
          this.notifyBox.innerHTML = `<b style="display:flex;justify-content:center;align-items:center;width:30px;height:30px; border-radius:50%;background:#fff;color:#000;font-weight:800">&#x26A0;</b><p style="flex:1;width:-moz-fit-content;width:fit-content; padding:0 0 6px 0; color: inherit;font-size:18px;font-weight:500;line-height:20px;cursor:pointer;"> ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id", "alertLoader");
          alertLoader.style =
            "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        case "info":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;max-width:400px;background: hsl(241, 93%, 29%); color: #fff;padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19); ${this.placement};border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;gap:1rem;`;
          this.notifyBox.innerHTML = `<b style="display:flex;justify-content:center;align-items:center;width:30px;height:30px; border-radius:50%;background:#fff;color:#000;font-weight:800">&#9432;</b><p style="flex:1;width:-moz-fit-content;width:fit-content; padding:0 0 6px 0; margin-right:10px; color: #f2f2f2;font-size:18px;font-weight:500;line-height:20px;cursor:pointer;"> ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id", "alertLoader");
          alertLoader.style =
            "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        default:
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;max-width:400px;background: rgb(92, 66, 208); color: #fff;padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;gap:1rem`;
          this.notifyBox.innerHTML = `<b style="display:flex;justify-content:center;align-items:center;width:30px;height:30px; border-radius:50%;background:#fff;color:#000;font-weight:800">&#63</b><p style="flex:1;width:-moz-fit-content;width:fit-content; padding:0 0 6px 0; color: #242526;font-size:18px;font-weight:500;line-height:20px;cursor:pointer;">; ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id", "alertLoader");
          alertLoader.style =
            "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
      }
    } else {
      throw new Error("unknown modal type");
    }
  }

  async hideOnClick() {
    if (document.body.contains(this.notifyBox)) {
      document.querySelectorAll("#alertLoader").forEach((loadIngTimeOut) => {
        loadIngTimeOut.style.width = "0";
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      document.body.removeChild(this.notifyBox);
    }
  }

  async autoHide(callback) {
    try {
      if (callback) {
        if (document.body.contains(this.notifyBox)) {
          clearTimeout(this.timeoutId);
          this.timeoutId = setTimeout(async () => {
            document
              .querySelectorAll("#alertLoader")
              .forEach((loadIngTimeOut) => {
                loadIngTimeOut.style.width = "0";
              });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (document.body.contains(this.notifyBox)) {
              document.body.removeChild(this.notifyBox);
            }
          }, this.alertTimeout);
        } else {
          return 0;
        }
      }
    } catch (error) {
      return `An error occurred: ${error}`;
    }
  }

  shouldAutoHide(callback = true) {
    this.autoHide(callback);
  }

  triggerBox(quest, callback) {
    const alertParentDiv = document.createElement("div");
    alertParentDiv.style =
      "position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.212);display: flex; justify-content: center;align-items: center;top:0;left:0;right:0;padding:15px;z-index: 1000000;";
    const alertContainerDiv = document.createElement("div");
    alertContainerDiv.style = `display: flex;flex-wrap:wrap;justify-content: center;align-items: center;gap: 1rem;max-width: 450px;width: 100%; background: hsl(0, 0%, 100%); box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);border-radius: 5px;word-wrap:break-word;`;
    const alertTextArea = document.createElement("div");
    alertTextArea.style =
      "width:100%;color: rgb(13 17 23 / 1);font-weight:500;pointer-event: auto;padding:1rem;border-bottom: 1px solid #dee2e6";
    alertTextArea.textContent = `${quest}`;
    const alertBtn = document.createElement("div");
    alertBtn.style =
      "margin-top:10px;width: 100%;display: flex;justify-content: flex-end;align-items: center;gap: 1rem;padding: 10px;";
    const alertOkBtn = document.createElement("button");
    alertOkBtn.style =
      "border:none;background: #23c55e; color: #242526;outline: none;padding:6px 2rem;font-size: 1rem;font-weight: 600;border-radius: 0.25rem;cursor:pointer;";
    const alertCancelBtn = document.createElement("button");
    alertCancelBtn.style =
      "border:none;background: #eb5f51;color: #fff;outline: none;padding:6px 2rem;font-size: 1rem;font-weight: 600;border-radius: 0.25rem;cursor:pointer;";
    alertCancelBtn.textContent = "No!";
    alertOkBtn.textContent = "Yes!";
    alertOkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      callback(true);
      document.body.removeChild(alertParentDiv);
    });
    alertCancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      callback(false);
      document.body.removeChild(alertParentDiv);
    });
    alertBtn.appendChild(alertOkBtn);
    alertBtn.appendChild(alertCancelBtn);
    alertContainerDiv.appendChild(alertTextArea);
    alertContainerDiv.appendChild(alertBtn);
    alertParentDiv.appendChild(alertContainerDiv);
    document.body.appendChild(alertParentDiv);
  }

  alert_Confirm(msg) {
    return new Promise((resolve) => {
      this.triggerBox(msg, (callback) => {
        resolve(callback);
      });
    });
  }

  async showModal() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    document.querySelector("#nonny-modal-box").style = "margin-top:0";
    document.querySelector("#nonny-modal-box .modal-div").style =
      "margin-top:0;transform:scale(1)";
  }

  async hideModal() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const hideThis = this.modalBox;
    if (hideThis) {
      hideThis.onclick = (e) => {
        if (e.target.classList.contains("close-nonny-modal")) {
          document.body.removeChild(hideThis);
        }
      };
    }
  }
}

export default AlertNotify;
