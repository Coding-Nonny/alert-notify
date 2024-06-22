var AlertNotify = (function () {
  'use strict';

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
      if (this.position == "top-right") this.placement = "top-right";
      if (this.position == "top-left") this.placement = "top-left";
      if (this.position == "top-center") this.placement = "top-center";
      if (this.position == "center") this.placement = "center";
      if (this.position == "bottom-left") this.placement = "bottom-left";
      if (this.position == "bottom-right") this.placement = "bottom-right";
      if (this.position == "bottom-center") this.placement = "bottom-center";
      this.notifyBox.addEventListener("click", (e) => {
        e.preventDefault();
        this.hideOnClick();
      });
      this.hideModal();
    }

    alert_message(msg = "", type = "", use = "fixed-modal", action = "Okay!") {
      const msgBox = `${msg}`;
      if (use == "fixed-modal") {
        switch (type) {
          case "success":
            document.body.appendChild(this.modalBox);
            this.modalBox.innerHTML = ` 
         <div class="nonny-modal-div nm-success">
         <span>&check;</span>
         <h2>Success!</h2>
         <p>
           ${msg}
         </p>
         <button class="close-nonny-modal">${action}</button>
       </div>`;
            this.showModal();
            break;
          case "warning":
            document.body.appendChild(this.modalBox);
            this.modalBox.innerHTML = ` 
         <div class="nonny-modal-div nm-warning">
         <span>&#x26A0;</span>
         <h2>Warning!</h2>
         <p>
           ${msg}
         </p>
         <button class="close-nonny-modal">${action}</button>
       </div>`;
            this.showModal();
            break;
          case "info":
            document.body.appendChild(this.modalBox);
            this.modalBox.innerHTML = ` 
           <div class="nonny-modal-div nm-info">
           <span>&#9432;</span>
           <h2>Info!</h2>
           <p>
             ${msg}
           </p>
           <button class="close-nonny-modal">${action}</button>
         </div>`;
            this.showModal();
            break;
          case "danger":
            document.body.appendChild(this.modalBox);
            this.modalBox.innerHTML = ` 
           <div class="nonny-modal-div nm-danger">
           <span>&times;</span>
           <h2>Danger!</h2>
           <p>
             ${msg}
           </p>
           <button class="close-nonny-modal">${action}</button>
         </div>`;
            this.showModal();
            break;
          default:
            document.body.appendChild(this.modalBox);
            this.modalBox.innerHTML = ` 
         <div class="nonny-modal-div nm-default">
         <span>&#63;</span>
         <h2>Default!</h2>
         <p>
           ${msg}
         </p>
         <button class="close-nonny-modal">${action}</button>
       </div>`;
            this.showModal();
            break;
        }
      } else if (use == "positioned-modal") {
        let alertLoader = "";
        switch (type) {
          case "success":
            document.body.appendChild(this.notifyBox);
            this.notifyBox.classList.add("nm-success", this.placement);
            this.notifyBox.innerHTML = `<b>&check;</b><p>${msgBox}</p>`;
            alertLoader = document.createElement("span");
            alertLoader.setAttribute("class", "nonny-alertLoader");
            this.notifyBox.appendChild(alertLoader);
            break;
          case "danger":
            document.body.appendChild(this.notifyBox);
            this.notifyBox.classList.add("nm-danger", this.placement);
            this.notifyBox.innerHTML = `<b>&times;</b><p>${msgBox}</p>`;
            alertLoader = document.createElement("span");
            alertLoader.setAttribute("class", "nonny-alertLoader");
            this.notifyBox.appendChild(alertLoader);
            break;
          case "warning":
            document.body.appendChild(this.notifyBox);
            this.notifyBox.classList.add("nm-warning", this.placement);
            this.notifyBox.innerHTML = `<b>&#x26A0;</b><p>${msgBox}</p>`;
            alertLoader = document.createElement("span");
            alertLoader.setAttribute("class", "nonny-alertLoader");
            this.notifyBox.appendChild(alertLoader);
            break;
          case "info":
            document.body.appendChild(this.notifyBox);
            this.notifyBox.classList.add("nm-info", this.placement);
            this.notifyBox.innerHTML = `<b>&#9432;</b><p>${msgBox}</p>`;
            alertLoader = document.createElement("span");
            alertLoader.setAttribute("class", "nonny-alertLoader");
            this.notifyBox.appendChild(alertLoader);
            break;
          default:
            document.body.appendChild(this.notifyBox);
            this.notifyBox.classList.add("nm-default", this.placement);
            this.notifyBox.innerHTML = `<b>&#63;</b><p>${msgBox}</p>`;
            alertLoader = document.createElement("span");
            alertLoader.setAttribute("class", "nonny-alertLoader");
            this.notifyBox.appendChild(alertLoader);
            break;
        }
      } else {
        throw new Error("unknown modal type");
      }
    }

    async hideOnClick() {
      if (document.body.contains(this.notifyBox)) {
        document
          .querySelectorAll(".nonny-alertLoader")
          .forEach((loadIngTimeOut) => {
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
                .querySelectorAll(".nonny-alertLoader")
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

    triggerBox(quest, accept, decline, callback) {
      const alertParentDiv = document.createElement("div");
      alertParentDiv.setAttribute("id", "nonny-confirm-box");
      const alertContainerDiv = document.createElement("div");
      alertContainerDiv.setAttribute("id", "alertContainerDiv");
      const alertTextArea = document.createElement("div");
      alertTextArea.setAttribute("id", "alertTextArea");
      alertTextArea.textContent = `${quest}`;
      const alertBtn = document.createElement("div");
      alertBtn.setAttribute("class", "nonny-alertBtn");
      const alertOkBtn = document.createElement("button");
      alertOkBtn.classList.add("conf_ok");
      const alertCancelBtn = document.createElement("button");
      alertCancelBtn.classList.add("conf_decl");
      alertCancelBtn.textContent = decline;
      alertOkBtn.textContent = accept;
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

    alert_Confirm(msg, accept = "Yes", decline = "No") {
      return new Promise((resolve) => {
        this.triggerBox(msg, accept, decline, (callback) => {
          resolve(callback);
        });
      });
    }

    async showModal() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      document.querySelector("#nonny-modal-box").classList.add("modal-visible");
      document
        .querySelector("#nonny-modal-box .nonny-modal-div")
        .classList.add("scaled");
    }

    async hideModal() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const hideThis = this.modalBox;
      if (hideThis) {
        hideThis.onclick = (e) => {
          if (e.target.classList.contains("close-nonny-modal")) {
            document.querySelector("#nonny-modal-box").classList.remove("modal-visible");
            document
              .querySelector("#nonny-modal-box .nonny-modal-div")
              .classList.remove("scaled");
            document.body.removeChild(hideThis);
          }
        };
      }
    }
  }

  return AlertNotify;

})();
