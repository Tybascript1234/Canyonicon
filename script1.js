// Translate

let activeDiv = null; // متغير global لتخزين الـdiv النشط

function toggleDivA(event, divId) {
  const dide = document.getElementById(divId);
  const button = event.currentTarget;

  if (activeDiv && activeDiv !== dide) {
    activeDiv.style.display = "none"; // إخفاء الـdiv النشط السابق
    document.getElementById(
      `toggleButtonss${activeDiv.id.slice(-1)}`
    ).style.backgroundColor = "lightgray"; // إعادة لون الزر السابق
  }

  if (dide.style.display === "block") {
    dide.style.display = "none";
    button.style.backgroundColor = "#365c6b00"; // العودة للون الأصلي
    activeDiv = null; // تحديث الـdiv النشط
  } else {
    dide.style.display = "block";
    button.style.backgroundColor = "#365c6b12"; // تغيير لون الزر عند الظهور
    activeDiv = dide; // تحديث الـdiv النشط
  }

  event.stopPropagation(); // منع الحدث من الانتقال إلى عناصر أخرى
}

// إخفاء الـdiv عند النقر خارجه
document.addEventListener("click", function (event) {
  if (activeDiv && !activeDiv.contains(event.target)) {
    activeDiv.style.display = "none";
    document.getElementById(
      `toggleButtonss${activeDiv.id.slice(-1)}`
    ).style.backgroundColor = "#365c6b00"; // إعادة لون الزر السابق
    activeDiv = null; // تحديث الـdiv النشط
  }
});

// crispy
// repply

window.addEventListener("load", function () {
  setTimeout(() => {
    // تأكد من أنه لا توجد رسائل JavaScript قبل تنفيذ الموجة
    if (!window.alertOpen) {
      initializeWaveButtons();
    }
  }, 100); // تأخير بسيط للتأكد من تحميل العناصر

  function initializeWaveButtons() {
    const elements = document.querySelectorAll(".wave-button");

    elements.forEach((element) => {
      let isRippleActive = false;

      function createRipple(e) {
        if (isRippleActive) return;

        isRippleActive = true;

        const ripple = document.createElement("span");
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        let x, y;
        if (e.clientX && e.clientY) {
          x = e.clientX - rect.left - size / 2;
          y = e.clientY - rect.top - size / 2;
        } else if (e.touches && e.touches[0]) {
          x = e.touches[0].clientX - rect.left - size / 2;
          y = e.touches[0].clientY - rect.top - size / 2;
        }

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add("ripple");

        element.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
          isRippleActive = false;
        }, 600);
      }

      element.addEventListener("mousedown", createRipple);
      element.addEventListener("touchstart", createRipple);
    });
  }
});

// ---------------------------------------------------------------------------------

//   box-shadow
// window.addEventListener("scroll", function () {
//   const box = document.querySelector(".    ");
//   const scrollPosition = window.scrollY;
//   const triggerPoint = 100; 

//   if (scrollPosition > triggerPoint) {
//     box.style.boxShadow = "0px 1px 0px rgb(185 185 185 / 18%)"; 
//   } else {
//     box.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"; 
//   }
// });

/////////////////

// scrollToTopBtn

// scrollToTopBtn//.

function fffo() {
  var div = document.getElementById("ffee");
  var buttonText = document.getElementById("buttonspan");
  if (div.style.display === "block") {
    div.style.display = "none"; // إظهار الديف
    buttonText.innerText = "Message";
  } else {
    div.style.display = "block"; // إخفاء الديف
    buttonText.innerText = "Message close";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const profiles = [
    {
      img: "unnamed (4).png",
      name: "Figma",
      desc: "We are happy to contact you if you wish.You can write to us using the correspondence button above",
      link: "https://play.google.com/store/apps/details?id=com.figma.mirror&hl=en",
      extraImages: [
        {
          img: "https://play-lh.googleusercontent.com/uuCiv63gjnMblhN5lcef_dSNb6ioNT-qTa70BOnxhaTvp4a9EShUmuTXTL8fwYFQk5o=w526-h296-rw",
          link: "",
        },
        {
          img: "https://play-lh.googleusercontent.com/dRhzWVa5Bjxb4LmeiHIXjgE8ANE4ClYHck57G3ycHfrbOPQm0YW2dbEeSZ_JgvrnPvjv=w526-h296-rw",
          link: "",
        },
        {
          img: "https://play-lh.googleusercontent.com/8zxzUvAI1tp3hvAm2EFI0VWgwJupH-o56SD_DFmMcy_cNAZ3G5pS-AjaN6nNCBLT5T4=w526-h296-rw",
          link: "",
        },
      ],
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png",
      name: "ChatGPT",
      desc: "It is an interactive language model developed by OpenAI that is good at answering questions, writing creatively, and helping with a wide range of text tasks.",
      link: "https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=en",
      extraImages: [
        {
          img: "https://play-lh.googleusercontent.com/8e0yFJ-T_ObwAfwq-Yfy6IpFGijH1wB841hsiMluRUPPi_3d9KsvreMP9WKG32zKM_Y=w2560-h1440-rw",
          link: "",
        },
        {
          img: "https://play-lh.googleusercontent.com/dlEvi5vi4ufI5YEj6IIH2syUYBByHe_JkF9DP8RDEIlV32cULG3_jAWneHRx5gnxIdKo=w526-h296-rw",
          link: "",
        },
        {
          img: "https://play-lh.googleusercontent.com/N41jOQ4dQDdkY-rhTzzIsNbX0PGeHK_QNAO8K0gpBpTl_u2MWdytDtO46EmC3thQBg=w526-h296-rw",
          link: "",
        },
      ],
    },
    {
      img: "https://play-lh.googleusercontent.com/4kF2IUQxdLs86iAVsmnHA1B34uO-dvtszKM8qzscc1InZb-2_JI0WANyOiWiV3qyNg",
      name: "Remove",
      desc: "It is a free tool to remove image background easily and quickly, allowing you to get high-quality transparent images with just one click.",
      link: "https://play.google.com/store/apps/details?id=bg.remove.android&hl=en",
      extraImages: [
        {
          img: "https://play-lh.googleusercontent.com/DbgQL2V5pxiZeSeXDCMpoOA6yAbBH21w6Nzt5DGnTFOQ59-AVHollnjnp-Xc3m3FFMI=w526-h296-rw",
          link: "",
        },
        {
          img: "https://play-lh.googleusercontent.com/IF699qN0jSO9wEUUGDczEt4-TpcDFpjQMlwdlrethRLXM2g8-1HwwpzKub9p7p7QN8c=w2560-h1440-rw",
          link: "",
        },
        {
          img: "https://play-lh.googleusercontent.com/I-zHHONjsyUxw2QUP35wO2Vi8R8P8Vi1H1J7W6aBJ6bSPJDyJBxm73TfMhVdG0SnKSg=w2560-h1440-rw",
          link: "",
        },
      ],
    },
  ];

  function updateContent() {
    const profile = profiles[currentIndex];
    document.getElementById("profileImage").src = profile.img;
    document.getElementById("profileName").textContent = profile.name;
    document.getElementById("profileDescription").textContent = profile.desc;
    document.getElementById("profileLink").href = profile.link;

    // Update extra images
    if (profile.extraImages && profile.extraImages.length >= 3) {
      document.getElementById("image1").src = profile.extraImages[0].img;
      document.getElementById("image1").addEventListener("click", function () {
        window.open(profile.extraImages[0].link, "_blank");
      });

      document.getElementById("image2").src = profile.extraImages[1].img;
      document.getElementById("image2").addEventListener("click", function () {
        window.open(profile.extraImages[1].link, "_blank");
      });

      document.getElementById("image3").src = profile.extraImages[2].img;
      document.getElementById("image3").addEventListener("click", function () {
        window.open(profile.extraImages[2].link, "_blank");
      });
    }

    currentIndex = (currentIndex + 1) % profiles.length;
  }

  function toggleDiv() {
    const div = document.getElementById("dynamicDiv");
    const hideButton = document.getElementById("hideButton");
    const showButton = document.getElementById("showButton");

    if (div.style.display === "none" || div.style.display === "") {
      div.style.display = "block";
      hideButton.style.display = "inline-block";
      showButton.style.display = "none";
    } else {
      div.style.display = "none";
      hideButton.style.display = "none";
      showButton.style.display = "flex";
    }
  }

  document.getElementById("hideButton").addEventListener("click", toggleDiv);
  document.getElementById("showButton").addEventListener("click", toggleDiv);
  updateContent();
  setInterval(updateContent, 10000);
});

document.addEventListener("click", function (event) {
  const target = event.target;

  // Toggle the display of the divs when clicking on the buttons
  if (target.matches(".show-btn")) {
    const targetId = target.getAttribute("data-target");
    const targetDiv = document.getElementById(targetId);
    if (!targetDiv.classList.contains("visible")) {
      // Show the div
      targetDiv.classList.add("visible");
      targetDiv.classList.remove("coffees");
      targetDiv.style.display = "block";
    } else {
      // Hide the div
      targetDiv.classList.remove("visible");
      targetDiv.classList.add("coffees");
      targetDiv.style.display = "none";
    }
  }

  // Hide the div when clicking on the hide button inside it
  if (target.matches(".hide-btn")) {
    const targetId = target.getAttribute("data-target");
    const targetDiv = document.getElementById(targetId);
    targetDiv.classList.remove("visible");
    targetDiv.classList.add("coffees");
    targetDiv.style.display = "none";
  }

  // Hide specific divs when clicking outside of them
  [
    "wwc1",
    "wwc2",
    "wwc3",
    "wwc4",
    "wwc5",
    "wwc6",
    "wwc7",
    "wwc8",
    "wwc11",
    "wwc12",
    "wwc13",
    "wwc14",
    "wwc15",
    "resetButton",
    "wwc17",
    "wwc19",
    "wwc20",
    "wwc21",
    "wwc22",
    "wwc23",
    "wwc24",
    "wwc25"
  ].forEach(function (id) {
    const div = document.getElementById(id);
    if (
      div &&
      div.classList.contains("visible") &&
      !div.contains(target) &&
      !target.matches(`[data-target="${id}"]`)
    ) {
      div.classList.remove("visible");
      div.classList.add("coffees");
      div.style.display = "none";
    }
  });
});

// script.js

document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "day-mode") {
    setDayMode();
  } else if (savedMode === "night-mode") {
    setNightMode();
  } else if (savedMode === "auto-mode") {
    setAutoMode();
  } else {
    // أول مرة يفتح الموقع
    localStorage.setItem("mode", "auto-mode");
    setAutoMode();
  }

  // أزرار التبديل
  document.getElementById("dayButton").addEventListener("click", () => {
    localStorage.setItem("mode", "day-mode");
    setDayMode();
  });

  document.getElementById("nightButton").addEventListener("click", () => {
    localStorage.setItem("mode", "night-mode");
    setNightMode();
  });

  document.getElementById("autoButton").addEventListener("click", () => {
    localStorage.setItem("mode", "auto-mode");
    setAutoMode();
  });

  // استماع لتغيير إعدادات النظام
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("mode") === "auto-mode") {
        setAutoMode();
      }
    });
});

function setDayMode() {
  document.body.classList.remove("night-mode");
  document.body.classList.add("day-mode");
  updateButtonIcons("dayButton");
  updateSelectedButton("Light mode");
}

function setNightMode() {
  document.body.classList.remove("day-mode");
  document.body.classList.add("night-mode");
  updateButtonIcons("nightButton");
  updateSelectedButton("Night mode");
}

function setAutoMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.body.classList.remove("day-mode");
    document.body.classList.add("night-mode");
    updateSelectedButton("Auto mode (Night)");
  } else {
    document.body.classList.remove("night-mode");
    document.body.classList.add("day-mode");
    updateSelectedButton("Auto mode (Day)");
  }
  updateButtonIcons("autoButton");
}

function updateButtonIcons(activeButtonId) {
  const dayButton = document.getElementById("dayButton");
  const nightButton = document.getElementById("nightButton");
  const autoButton = document.getElementById("autoButton");

  const checkIcon = '<span class="material-symbols-outlined">check</span>';

  dayButton.innerHTML = "Light mode";
  nightButton.innerHTML = "Night mode";
  autoButton.innerHTML = "Auto mode";

  if (activeButtonId === "dayButton") {
    dayButton.innerHTML += " " + checkIcon;
  } else if (activeButtonId === "nightButton") {
    nightButton.innerHTML += " " + checkIcon;
  } else if (activeButtonId === "autoButton") {
    autoButton.innerHTML += " " + checkIcon;
  }
}

function updateSelectedButton(label) {
  const selected = document.getElementById("selectedButton");
  selected.textContent = label;
}

// //  context-menu
// document.addEventListener("mouseup", function(event) {
//     var contextMenu = document.getElementById("context-menu");
//     var selectedText = window.getSelection().toString().trim();
//     var selectedLink = '';
//     if (event.target.tagName === 'A') {
//         selectedLink = event.target.href;
//     } else if (event.target.closest("a")) {
//         selectedLink = event.target.closest("a").href;
//     }
//     if (selectedText !== "" || selectedLink !== "") {
//         contextMenu.style.display = "flex";
//         contextMenu.style.left = event.pageX + "px";
//         contextMenu.style.top = event.pageY + "px";
//         if (selectedLink) {
//             document.getElementById("open-link-button").style.display = "flex";
//             document.getElementById("open-link-button").setAttribute("data-link", selectedLink);
//         } else {
//             document.getElementById("open-link-button").style.display = "none";
//         }
//     } else {
//         contextMenu.style.display = "none";
//     }
// });

// function copyText() {
//     var selectedText = window.getSelection().toString();
//     navigator.clipboard.writeText(selectedText)
//         .then(() => alert("Text copied successfully"))
//         .catch(err => alert("Error copying text: " + err));
//     hideContextMenu();
// }

// function shareText() {
//     var selectedText = window.getSelection().toString();
//     if (navigator.share) {
//         navigator.share({
//             title: 'Shared Text',
//             text: selectedText,
//         })
//         .then(() => console.log('Successful share'))
//         .catch((error) => console.log('Error sharing:', error));
//     } else {
//         alert("To share, please copy the selected text manually.");
//     }
//     hideContextMenu();
// }

// function searchText() {
//     var selectedText = window.getSelection().toString();
//     var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(selectedText);
//     window.open(searchUrl, "_blank");
//     hideContextMenu();
// }

// function selectAllText() {
//     var selection = window.getSelection();
//     selection.selectAllChildren(document.body);
//     hideContextMenu();
// }

// function openLink() {
//     var link = document.getElementById("open-link-button").getAttribute("data-link");
//     if (link !== null && link !== "") {
//         window.open(link, "_blank");
//     }
// }

// function hideContextMenu() {
//     var contextMenu = document.getElementById("context-menu");
//     contextMenu.style.display = "none";
// }

// logo-link

function open_Link() {
  window.open("#", "_blank");
}

function share_Link() {
  if (navigator.share) {
    navigator
      .share({
        title: "مثال",
        text: "تحقق من هذا الرابط المذهل!",
        url: "",
      })
      .then(() => {
        console.log("تمت المشاركة بنجاح");
      })
      .catch((error) => {
        console.log("حدث خطأ أثناء المشاركة:", error);
      });
  } else {
    alert("ميزة المشاركة غير مدعومة في متصفحك.");
  }
}

function reload_Page() {
  location.reload();
}

// message-gmail

// message-gmail/.

// copy-image

// copy-image/.

// بحث 2
// Initialize Google Translate Element
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
    },
    "google_translate_element"
  );
}

// Select language and update display based on the selected language
function selectLanguage(langCode) {
  var selectElement = document.querySelector(".goog-te-combo");
  if (selectElement) {
    selectElement.value = langCode;
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));

    // Hide Google Translate tooltip on language selection
    var tooltipElement = document.getElementById("google_translate_tooltip");
    if (tooltipElement) {
      tooltipElement.style.display = "none";
      tooltipElement.style.visibility = "hidden";
    }

    // Update selected language display
    var selectedLanguageDiv = document.getElementById(
      "selected_language_display"
    );
    if (selectedLanguageDiv) {
      selectedLanguageDiv.textContent = "" + getLanguageName(langCode);
    }

    // Update language background display
    var languageBackground = document.getElementById(
      "language_background_display"
    );
    if (languageBackground) {
      languageBackground.style.backgroundPosition = "-1px -69px"; // Default position
      switch (langCode) {
        case "ar":
          languageBackground.style.backgroundPosition = "-1px -52px";
          break;
        case "ur":
          languageBackground.style.backgroundPosition = "-1px -2772px";
          break;
        case "tr":
          languageBackground.style.backgroundPosition = "-1px -2126px";
          break;
        case "fr":
          languageBackground.style.backgroundPosition = "-1px -324px";
          break;
        case "ja":
          languageBackground.style.backgroundPosition = "-1px -528px";
          break;
        case "zh-CN":
          languageBackground.style.backgroundPosition = "-1px -1072px";
          break;
        case "ru":
          languageBackground.style.backgroundPosition = "-1px -868px";
          break;
        case "es":
          languageBackground.style.backgroundPosition = "-1px -1480px";
          break;
        // Add more cases for other languages as needed
      }
    }
  }
}

// Get the language name based on the language code
function getLanguageName(langCode) {
  switch (langCode) {
    case "en":
      return "English";
    case "ar":
      return "Arabic";
    case "ur":
      return "Urdu";
    case "tr":
      return "Turkish";
    case "fr":
      return "French";
    case "ja":
      return "Japanese";
    case "zh-CN":
      return "Chinese";
    case "ru":
      return "Russian";
    case "es":
      return "Spanish";
    default:
      return "Unknown";
  }
}

// On window load, initialize Google Translate and set up search functionality
window.onload = function () {
  setTimeout(googleTranslateElementInit, 1000); // Wait for the Google Translate widget to load

  const searchInputField = document.getElementById("button_search_input");
  const translationButtons = document.querySelectorAll(
    "#translation_buttons_container .button-container button"
  );
  const noResultsMessageDiv = document.getElementById("no_results_message");
  const searchQueryDisplay = document.getElementById("searched_query_display");

  // Event listener for search input
  searchInputField.addEventListener("input", function () {
    const searchTerm = searchInputField.value.toLowerCase();
    let hasResults = false;

    // Loop through buttons and display/hide based on search term
    translationButtons.forEach((button) => {
      const buttonName = button.getAttribute("data-name").toLowerCase();
      if (buttonName.includes(searchTerm)) {
        button.style.display = "inline-block";
        hasResults = true;
      } else {
        button.style.display = "none";
      }
    });

    // Handle display of no results message and button visibility
    if (searchTerm === "") {
      // If search is cleared, show all buttons and hide the no results div
      translationButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
      noResultsMessageDiv.style.display = "none";
    } else if (!hasResults) {
      // If no results found, display the no results div
      noResultsMessageDiv.style.display = "block";
      searchQueryDisplay.textContent = searchTerm;
    } else {
      // Hide no results div if results are found
      noResultsMessageDiv.style.display = "none";
    }
  });
};

// بحث 2/.

document.addEventListener("DOMContentLoaded", (event) => {
  let images = [];
  let svgs = [];
  let openImageButtonStates = [];
  let currentIndex = -1;
  let uploadAttemptsLeft = 4;
  let isSaved = false;

  const spans = document.querySelectorAll("span");
  spans.forEach((span) => {
    span.dataset.originalColor = window.getComputedStyle(span).color;
  });

  // حل مشكلة النافذة التلقائية
  const fileInput = document.getElementById("file-input");
  fileInput.addEventListener("click", function (e) {
    e.stopPropagation(); // منع انتشار الحدث
  });

  document
    .getElementById("file-input")
    .addEventListener("change", function (event) {
      if (uploadAttemptsLeft > 0) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            images.push(e.target.result);
            svgs.push("");
            openImageButtonStates.push(false);
            currentIndex = images.length - 1;
            displayImage(e.target.result);
            clearSVGContainers();
            uploadAttemptsLeft--;
            document.getElementById(
              "uploads-left"
            ).textContent = `+ ${uploadAttemptsLeft}`;
            updateDownloadButton();
            document.getElementById("open-image-button").style.display = "none";
          };
          reader.readAsDataURL(file);
        }
      } else {
        alert("قد انتهت الفترة التجريبية");
      }
    });

  document
    .getElementById("load-url-button")
    .addEventListener("click", function () {
      if (uploadAttemptsLeft > 0) {
        const url = document.getElementById("image-url-input").value;
        if (url) {
          const img = new Image();
          img.crossOrigin = "Anonymous";

          img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL("image/png");

            images.push(dataURL);
            svgs.push("");
            openImageButtonStates.push(false);
            currentIndex = images.length - 1;
            displayImage(dataURL);
            clearSVGContainers();
            uploadAttemptsLeft--;
            document.getElementById(
              "uploads-left"
            ).textContent = `+ ${uploadAttemptsLeft}`;
            updateDownloadButton();
            document.getElementById("open-image-button").style.display = "none";
            document.getElementById("link-upload-container").style.display =
              "none";
          };

          img.onerror = function () {
            alert(
              "لا يمكن تحميل الصورة. تأكد من أن الصورة تدعم CORS أو أنها من مصدر موثوق."
            );
          };

          img.src = url;
        }
      } else {
        alert("قد انتهت الفترة التجريبية");
      }
    });

  // تعديل هنا لمنع السلوك التلقائي
  document
    .getElementById("file-upload-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("file-input").click();
    });

  document
    .getElementById("close-upload-container")
    .addEventListener("click", function () {
      document.getElementById("link-upload-container").style.display = "none";
    });

  document
    .getElementById("prev-image-button")
    .addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        displayImage(images[currentIndex]);
        displaySVG(svgs[currentIndex]);
        updateDownloadButton();
        document.getElementById("open-image-button").style.display =
          openImageButtonStates[currentIndex] ? "flex" : "none";
      }
    });

  document
    .getElementById("next-image-button")
    .addEventListener("click", function () {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        displayImage(images[currentIndex]);
        displaySVG(svgs[currentIndex]);
        updateDownloadButton();
        document.getElementById("open-image-button").style.display =
          openImageButtonStates[currentIndex] ? "flex" : "none";
      }
    });

  document
    .getElementById("generate-svg-button")
    .addEventListener("click", function () {
      const img = document.getElementById("uploaded-image");
      if (img) {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          ctx.getImageData(0, 0, 1, 1);

          ImageTracer.imageToSVG(
            img.src,
            function (svgString) {
              svgString = optimizeSVG(svgString);
              svgs[currentIndex] = svgString;

              const svgContainer = document.getElementById(
                "svg-output-container"
              );
              svgContainer.innerHTML = "";
              const parser = new DOMParser();
              const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
              svgContainer.appendChild(svgDoc.documentElement);

              const codeContainer =
                document.getElementById("svg-code-container");
              codeContainer.textContent = svgString;

              updateDownloadButton();
              document.getElementById("open-image-button").style.display =
                "flex";
              openImageButtonStates[currentIndex] = true;

              const notification = document.getElementById("notification");
              notification.style.display = "flex";
              setTimeout(() => {
                notification.style.display = "none";
              }, 3000);
            },
            {
              scale: 1,
              ltres: 0.01,
              qtres: 0.01,
              pathomit: 0,
              colorsampling: 0,
              numberofcolors: 64,
              mincolorratio: 0,
              colorquantcycles: 3,
              strokewidth: 1,
            }
          );
        } catch (e) {
          alert(
            "لا يمكن معالجة هذه الصورة بسبب قيود الأمان. يرجى رفع الصورة مباشرة بدلاً من استخدام رابط."
          );
          console.error("Security Error:", e);
        }
      } else {
        alert("يرجى رفع صورة أولاً.");
      }
    });

  document
    .getElementById("download-svg-button")
    .addEventListener("click", function () {
      const svgString = this.getAttribute("data-svg") || svgs[currentIndex];
      if (svgString) {
        const fileName = prompt("يرجى إدخال اسم للصورة:");
        if (fileName) {
          downloadSVG(svgString, fileName);
        }
      } else {
        alert("لا توجد بيانات SVG للتحميل.");
      }
    });

  document
    .getElementById("open-image-button")
    .addEventListener("click", function () {
      const svgString =
        document.getElementById("svg-code-container").textContent;
      if (svgString) {
        const win = window.open();
        win.document.write(
          `<html><head><title>My Start (SVG) Image</title></head><body><img src="data:image/svg+xml;base64,${btoa(
            svgString
          )}"></body></html>`
        );
      } else {
        alert("لا توجد بيانات SVG لعرضها.");
      }
    });

  document
    .getElementById("reset-button")
    .addEventListener("click", function () {
      document.getElementById("uploaded-image-container").innerHTML = "";
      document.getElementById("svg-output-container").innerHTML = "";
      document.getElementById("svg-code-container").textContent = "";
      fileInput.value = "";
      images = [];
      svgs = [];
      openImageButtonStates = [];
      currentIndex = -1;
      uploadAttemptsLeft = 4;
      document.getElementById(
        "uploads-left"
      ).textContent = `+ ${uploadAttemptsLeft}`;
      localStorage.removeItem("savedImages");
      localStorage.removeItem("savedSVGs");
      localStorage.removeItem("currentIndex");
      localStorage.removeItem("uploadAttemptsLeft");
      localStorage.removeItem("openImageButtonStates");
      document.getElementById("save-button").innerHTML =
        '<ion-icon class="Full" name="bookmark-outline" title="Saves"></ion-icon>';
      isSaved = false;

      const downloadButton = document.getElementById("download-svg-button");
      downloadButton.removeAttribute("data-svg");
      downloadButton.disabled = true;

      document.getElementById("open-image-button").style.display = "none";
    });

  function toggle_button() {
    const container = document.getElementById("content-container");
    container.style.display =
      container.style.display === "flex" ? "none" : "flex";
  }

  document
    .getElementById("fullscreen-button")
    .addEventListener("click", function () {
      const container = document.getElementById("content-container");
      const body = document.body;
      if (container.classList.contains("fullscreen")) {
        container.classList.remove("fullscreen");
        this.innerHTML =
          '<ion-icon name="scan-outline" class="Full" title="Full screen"></ion-icon>';
        body.classList.remove("fullscreen-active");
      } else {
        container.classList.add("fullscreen");
        this.innerHTML =
          '<ion-icon name="contract-outline" class="Full" title="Minimize screen"></ion-icon>';
        body.classList.add("fullscreen-active");
      }
    });

  document.getElementById("save-button").addEventListener("click", function () {
    if (isSaved) {
      localStorage.removeItem("savedImages");
      localStorage.removeItem("savedSVGs");
      localStorage.removeItem("currentIndex");
      localStorage.removeItem("uploadAttemptsLeft");
      localStorage.removeItem("openImageButtonStates");
      this.innerHTML =
        '<ion-icon class="Full" name="bookmark-outline" title="Saves"></ion-icon>';
      isSaved = false;
      document.getElementById("open-image-button").style.display = "none";
    } else {
      localStorage.setItem("savedImages", JSON.stringify(images));
      localStorage.setItem("savedSVGs", JSON.stringify(svgs));
      localStorage.setItem("currentIndex", currentIndex);
      localStorage.setItem("uploadAttemptsLeft", uploadAttemptsLeft);
      localStorage.setItem(
        "openImageButtonStates",
        JSON.stringify(openImageButtonStates)
      );
      this.innerHTML =
        '<ion-icon class="Full onclick-button" name="bookmark" title="Cancel saving"></ion-icon>';
      isSaved = true;
    }
  });

  window.addEventListener("load", function () {
    if (localStorage.getItem("savedImages")) {
      images = JSON.parse(localStorage.getItem("savedImages"));
      svgs = JSON.parse(localStorage.getItem("savedSVGs"));
      openImageButtonStates =
        JSON.parse(localStorage.getItem("openImageButtonStates")) || [];
      currentIndex = parseInt(localStorage.getItem("currentIndex"), 10);
      uploadAttemptsLeft = parseInt(
        localStorage.getItem("uploadAttemptsLeft"),
        10
      );
      if (currentIndex >= 0 && currentIndex < images.length) {
        displayImage(images[currentIndex]);
        displaySVG(svgs[currentIndex]);

        const downloadButton = document.getElementById("download-svg-button");
        downloadButton.setAttribute("data-svg", svgs[currentIndex]);
        downloadButton.disabled = false;

        document.getElementById("open-image-button").style.display =
          openImageButtonStates[currentIndex] ? "flex" : "none";
      }
      document.getElementById("save-button").innerHTML =
        '<ion-icon class="onclick-button" name="bookmark" title="Cancel saving"></ion-icon>';
      document.getElementById(
        "uploads-left"
      ).textContent = `+ ${uploadAttemptsLeft}`;
      isSaved = true;
    }
  });

  document
    .getElementById("copy-svg-button")
    .addEventListener("click", function () {
      const svgString =
        document.getElementById("svg-code-container").textContent;
      if (svgString) {
        copyToClipboard(svgString);
      } else {
        alert("لا يوجد كود SVG لنسخه.");
      }
    });

  window.scrollToSection = function (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`العنصر بمعرف ${sectionId} غير موجود.`);
    }
  };

  const spansArray = Array.from(spans);
  spansArray.forEach((span) => {
    span.addEventListener("click", function () {
      spansArray.forEach((s) => (s.style.color = s.dataset.originalColor));
      this.style.color = "black";
    });
  });

  function displayImage(src) {
    const imageContainer = document.getElementById("uploaded-image-container");
    imageContainer.innerHTML = "";

    const img = document.createElement("img");
    img.id = "uploaded-image";
    img.crossOrigin = "Anonymous";
    img.src = src;
    imageContainer.appendChild(img);
  }

  function displaySVG(svgString) {
    const svgContainer = document.getElementById("svg-output-container");
    svgContainer.innerHTML = "";
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    svgContainer.appendChild(svgDoc.documentElement);

    const codeContainer = document.getElementById("svg-code-container");
    codeContainer.textContent = svgString;
  }

  function clearSVGContainers() {
    document.getElementById("svg-output-container").innerHTML = "";
    document.getElementById("svg-code-container").textContent = "";
  }

  function optimizeSVG(svgString) {
    return svgString;
  }

  function downloadSVG(svgString, fileName) {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      function () {
        alert("تم نسخ كود SVG بنجاح!");
      },
      function (err) {
        alert("فشل في نسخ كود SVG: " + err);
      }
    );
  }

  document
    .getElementById("color-picker")
    .addEventListener("change", function (event) {
      updateSVGColor(event.target.value);
    });

  function updateSVGColor(color) {
    const svg = document.querySelector("#svg-output-container svg");
    if (svg) {
      svg
        .querySelectorAll("path, circle, rect, polyline, polygon")
        .forEach(function (element) {
          element.style.fill = color;
          element.style.stroke = color;
        });
    }
  }

  function updateSVGColorInString(svgString, color) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    svgDoc
      .querySelectorAll("path, circle, rect, polyline, polygon")
      .forEach(function (element) {
        element.setAttribute("fill", color);
        element.setAttribute("stroke", color);
      });
    return new XMLSerializer().serializeToString(svgDoc);
  }

  window.updateSVGColorInString = updateSVGColorInString;

  function updateDownloadButton() {
    const downloadButton = document.getElementById("download-svg-button");
    downloadButton.setAttribute("data-svg", svgs[currentIndex]);
    downloadButton.disabled = !svgs[currentIndex];
  }

  document
    .getElementById("file-input-button")
    .addEventListener("click", function () {
      document.getElementById("link-upload-container").style.display = "block";
    });

  document.getElementById("file-input").addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
      document.getElementById("link-upload-container").style.display = "none";
    }
  });

  const dropZone = document.getElementById("uploaded-image-container");

  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", function () {
    this.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("drag-over");

    if (uploadAttemptsLeft > 0) {
      const file = e.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          images.push(e.target.result);
          svgs.push("");
          openImageButtonStates.push(false);
          currentIndex = images.length - 1;
          displayImage(e.target.result);
          clearSVGContainers();
          uploadAttemptsLeft--;
          document.getElementById(
            "uploads-left"
          ).textContent = `+ ${uploadAttemptsLeft}`;
          updateDownloadButton();
          document.getElementById("open-image-button").style.display = "none";
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert("قد انتهت الفترة التجريبية");
    }
  });

  window.toggle_button = toggle_button;
});

// ---------------------------------------------------------------------------------------------------------------

window.addEventListener("mousedown", function (event) {
  document.querySelectorAll(".on_click").forEach((on_click) => {
    if (
      !on_click.contains(event.target) &&
      !event.target.closest(".on_click")
    ) {
      on_click.style.display = "none";
    }
  });
});

// للهاتف (اللمس)
window.addEventListener("touchstart", function (event) {
  document.querySelectorAll(".on_click").forEach((on_click) => {
    if (
      !on_click.contains(event.target) &&
      !event.target.closest(".on_click")
    ) {
      on_click.style.display = "none";
    }
  });
});

// ----------------------------------------------------------------------------------------------------------------

// دالة إعادة ضبط الفلترة
function clearFilter() {
  ["category1", "category2", "category3", "gallery"].forEach((categoryId) => {
    document
      .querySelectorAll(`#${categoryId} .image-container`)
      .forEach((imageContainer) => {
        imageContainer.style.display = "flex";
      });
  });

  document.querySelectorAll("#alphabet-buttons a").forEach((button) => {
    button.style.color = "";
    button.style.backgroundColor = "";
  });

  document
    .querySelectorAll('#alphabet-buttons input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#alphabet-buttons a").forEach((button) => {
    // إضافة خانة اختيار إلى كل رابط
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    button.appendChild(checkbox);

    // دالة لتحديث الفلترة بناءً على كل الأحرف المحددة
    function updateMultiFilter() {
      const selectedLetters = Array.from(
        document.querySelectorAll(
          '#alphabet-buttons input[type="checkbox"]:checked'
        )
      ).map((cb) => cb.parentElement.textContent.trim().toLowerCase());

      if (selectedLetters.length === 0) {
        clearFilter();
      } else {
        filterByLetters(selectedLetters);
      }
    }

    // التعامل مع النقر على الرابط
    button.addEventListener("click", function (e) {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      updateMultiFilter();
    });

    // التعامل مع النقر على الـ checkbox
    checkbox.addEventListener("click", function (e) {
      e.stopPropagation();
      updateMultiFilter();
    });
  });

  // تصفية الصور بناءً على مجموعة أحرف
  function filterByLetters(letters) {
    ["category1", "category2", "category3", "gallery"].forEach((categoryId) => {
      document
        .querySelectorAll(`#${categoryId} .image-container`)
        .forEach((imageContainer) => {
          const nameElement = imageContainer.querySelector(".image-name");
          let title = nameElement?.title?.toLowerCase();

          // تعديل خاص للـ Logos لإزالة البادئة
          if (imageContainer.closest("#category1")) {
            title = title.replace(/^logo-/, ""); // إزالة "logo-" من البداية
          }

          const matches = letters.some((letter) => title?.startsWith(letter));
          imageContainer.style.display = matches ? "flex" : "none";
        });
    });

    // تحديث ألوان الأزرار
    document.querySelectorAll("#alphabet-buttons a").forEach((button) => {
      const isChecked = button.querySelector('input[type="checkbox"]').checked;
      button.style.color = isChecked ? "#298dff" : "";
      button.style.backgroundColor = isChecked ? "rgb(161 195 255 / 26%)" : "";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // إظهار الزر عند التمرير
  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 100) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  // عند الضغط، العودة لأعلى الصفحة
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function copyText() {
  let div = document.querySelector(".copy-text"); // تحديد الديف عبر الكلاس
  let text = div.innerText; // جلب النص داخل الديف

  let textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  alert("تم نسخ النص!");
}

window.addEventListener("scroll", function () {
  const body = document.body;
  if (window.scrollY > 400) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".material-symbols-outlined").forEach((element) => {
    if (!element.classList.contains("notranslate")) {
      element.classList.add("notranslate");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "👋مرحبًا!",
    "كيف حالك؟",
    "أهلاً بعودتك من جديد",
    // "<edit><span></span><div></div></edit>",
    '<img src="Flag.png" alt="Pride Flag"> لا تنسى فلسطين',
    "اللهم انصرهم وثبت اقدامهم",
  ];

  let index = 0;
  const span = document.getElementById("mySpan");
  const div = document.getElementById("logoe");

  function showNextText() {
    // إخفاء النص الحالي
    span.style.opacity = 0;

    setTimeout(() => {
      // هل هناك المزيد من النصوص؟
      if (index < texts.length) {
        // عرض النص الجديد (باستخدام innerHTML لدعم HTML مثل الصور)
        span.innerHTML = texts[index];
        span.style.opacity = 1;

        // تغيير ستايل الديف
        div.classList.add("div-style");
        setTimeout(() => {
          div.classList.remove("div-style");
        }, 2000);

        index++;
      } else {
        // عند الانتهاء من كل النصوص:
        span.style.opacity = 0;
        setTimeout(() => {
          span.style.display = "none";
        }, 1000); // ننتظر انتهاء التلاشي قبل الإخفاء النهائي

        clearInterval(interval); // إيقاف التكرار
      }
    }, 3000); // التأخير قبل ظهور النص التالي (3 ثواني)
  }

  showNextText(); // أول مرة
  const interval = setInterval(showNextText, 6000); // كل 3 ثواني إخفاء، 3 ثواني تأخير بين النصوص
});

// -------------------------------------------------------------------------

// QR ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const qrText = document.getElementById("qrText");
  const logoInput = document.getElementById("logoInput");
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const qrcodeContainer = document.getElementById("qrcode");
  const logo = document.getElementById("logo");

  let qrCodeInstance = null;

  // تحسين أداء تحميل الصورة
  logoInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      logo.src = event.target.result;
      logo.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  // إنشاء QR Code مع تحسين الأداء
  generateBtn.addEventListener("click", function () {
    const text = qrText.value.trim();
    if (!text) {
      alert("الرجاء إدخال نص أو رابط أولاً!");
      return;
    }

    // إزالة QR السابق إن وجد
    if (qrCodeInstance) {
      qrCodeInstance.clear();
      qrcodeContainer.innerHTML = '<img id="logo" src="" alt="Logo">';
    }

    // إنشاء QR جديد
    qrCodeInstance = new QRCode(qrcodeContainer, {
      text: text,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    // إعادة تعيين اللوجو إن وجد
    if (logoInput.files[0]) {
      logo.style.display = "block";
    }

    downloadBtn.disabled = false;
  });

  // تنزيل سريع مع تحسينات html2canvas
  downloadBtn.addEventListener("click", async function () {
    if (!qrCodeInstance) {
      alert("الرجاء إنشاء QR Code أولاً!");
      return;
    }

    downloadBtn.disabled = true;
    downloadBtn.textContent = "جاري التجهيز...";

    try {
      // إعدادات محسنة للأداء
      const canvas = await html2canvas(qrcodeContainer, {
        scale: 1, // تقليل الحجم لزيادة السرعة
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        removeContainer: true,
        cacheBust: false,
      });

      const link = document.createElement("a");
      link.download = "qrcode_" + Date.now() + ".png";
      link.href = canvas.toDataURL("image/png", 0.9); // جودة 90%
      link.click();
    } catch (err) {
      console.error("خطأ في التنزيل:", err);
      alert("حدث خطأ أثناء التنزيل");
    } finally {
      downloadBtn.disabled = false;
      downloadBtn.textContent = "تنزيل QR Code";
    }
  });
});

// ------------------------------------------------------------------------------------

function generateBarcode() {
  const text = document.getElementById("barcodeText").value;
  JsBarcode("#barcode", text, { format: "CODE128", displayValue: true });
}

function downloadBarcode() {
  const svg = document.querySelector("#barcode");
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngFile;
    downloadLink.download = "barcode.png";
    downloadLink.click();
  };
  img.src = "data:image/svg+xml;base64," + btoa(svgData);
}

//   -------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".click-button");
  const allMenus = document.querySelectorAll(".menu3");
  const overlay = document.getElementById("menu-overlay");

  let currentButton = null;
  let currentMenu = null;

  function positionMenu(button, menu) {
    const rect = button.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    const margin = 5;

    let left = rect.left + scrollX;
    let top = rect.bottom + scrollY + margin;

    // تعديل الموضع إذا تجاوز الحواف
    if (left + menuWidth > window.innerWidth + scrollX) {
      left = window.innerWidth + scrollX - menuWidth - margin;
    }

    if (top + menuHeight > window.innerHeight + scrollY) {
      top = rect.top + scrollY - menuHeight - margin;
    }

    // نستخدم fixed ونحسب الموضع نسبة للنافذة
    menu.style.position = "fixed";
    menu.style.left = `${rect.left}px`;
    menu.style.top = `${rect.bottom + margin}px`;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const menuId = button.getAttribute("data-menu");
      const menu3 = document.getElementById(menuId);

      if (!menu3) {
        console.warn(`القائمة "${menuId}" غير موجودة.`);
        return;
      }

      // إغلاق القوائم الأخرى
      allMenus.forEach((m) => (m.style.display = "none"));

      menu3.style.display = "block";
      positionMenu(button, menu3);

      currentButton = button;
      currentMenu = menu3;

      overlay.style.display = "block";
    });
  });

  function closeMenus() {
    allMenus.forEach((menu) => (menu.style.display = "none"));
    overlay.style.display = "none";
    currentButton = null;
    currentMenu = null;
  }

  overlay.addEventListener("mousedown", closeMenus);
  overlay.addEventListener("touchstart", closeMenus);

  // إعادة تموضع القائمة عند التمرير
  window.addEventListener("scroll", () => {
    if (currentButton && currentMenu && currentMenu.style.display === "block") {
      positionMenu(currentButton, currentMenu);
    }
  });

  window.addEventListener("resize", () => {
    if (currentButton && currentMenu && currentMenu.style.display === "block") {
      positionMenu(currentButton, currentMenu);
    }
  });
});

//   -----------------------------------------------------------------------------------------


// document.addEventListener("DOMContentLoaded", function () {
//   // روابط الصور لكل نوع رسالة
//   const icons = {
//     alert: "https://cdn-icons-png.flaticon.com/512/1827/1827312.png", // جرس
//     confirm: "https://cdn-icons-png.flaticon.com/512/3136/3136129.png", // سؤال
//     prompt: "https://cdn-icons-png.flaticon.com/512/5611/5611979.png", // قلم
//     log: "https://cdn-icons-png.flaticon.com/512/595/595067.png", // ورقة
//     warn: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png", // انتباه
//     error: "https://cdn-icons-png.flaticon.com/512/1828/1828842.png", // خطأ
//     default: "https://cdn-icons-png.flaticon.com/512/1827/1827312.png", // افتراضي (جرس)
//   };

//   // Data URL لنقطة زرقاء صغيرة (svg favicon)
//   const blueDotFavicon =
//     "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><circle cx='8' cy='8' r='6' fill='%23007bff'/></svg>";
//   let oldFaviconHref = null;

//   function setBlueDotFavicon() {
//     // حفظ القديم فقط في أول مرة
//     if (oldFaviconHref === null) {
//       const old = document.querySelector("link[rel~='icon']");
//       oldFaviconHref = old ? old.href : null;
//     }
//     removeExistingFavicons();
//     const link = document.createElement("link");
//     link.rel = "icon";
//     link.type = "image/svg+xml";
//     link.href = blueDotFavicon;
//     document.head.appendChild(link);
//   }

//   function restoreFavicon() {
//     removeExistingFavicons();
//     if (oldFaviconHref) {
//       const link = document.createElement("link");
//       link.rel = "icon";
//       link.href = oldFaviconHref;
//       document.head.appendChild(link);
//     }
//   }
//   // حذف كل الأيقونات السابقة
//   function removeExistingFavicons() {
//     document.querySelectorAll("link[rel~='icon']").forEach((e) => e.remove());
//   }

//   function getPageTitle() {
//     return document.title || window.location.pathname;
//   }

//   // --- إضافة مانع الأحداث على الـ overlay وعلى محتوى الرسالة ---
//   function enableOverlayCapture() {
//     const overlay = document.getElementById("custom-alert-overlay");
//     const alertBox = document.getElementById("custom-alert-box");
//     overlay._customBlockHandler = function (e) {
//       // السماح فقط لعناصر الإدخال/الأزرار داخل الصندوق
//       if (!alertBox.contains(e.target)) {
//         e.stopPropagation();
//         e.preventDefault();
//         return false;
//       }
//       // إذا تم النقر على الصندوق نفسه أو أي عنصر ليس زر أو input أو textarea أو select أو label، امنع كل شيء
//       if (
//         e.target === alertBox ||
//         (alertBox.contains(e.target) &&
//           !["BUTTON", "INPUT", "TEXTAREA", "SELECT", "LABEL"].includes(
//             e.target.tagName
//           ))
//       ) {
//         e.stopPropagation();
//         e.preventDefault();
//         return false;
//       }
//       return true;
//     };
//     [
//       "click",
//       "mousedown",
//       "mouseup",
//       "dblclick",
//       "contextmenu",
//       "keydown",
//       "keyup",
//       "keypress",
//       "touchstart",
//       "touchend",
//       "pointerdown",
//       "pointerup",
//     ].forEach(function (eventName) {
//       overlay.addEventListener(eventName, overlay._customBlockHandler, true);
//       document.body.addEventListener(
//         eventName,
//         overlay._customBlockHandler,
//         true
//       );
//       alertBox.addEventListener(eventName, overlay._customBlockHandler, true); // مهم: حتى النقرات الكثيرة على محتوى الصندوق
//     });
//   }

//   function disableOverlayCapture() {
//     const overlay = document.getElementById("custom-alert-overlay");
//     const alertBox = document.getElementById("custom-alert-box");
//     if (!overlay._customBlockHandler) return;
//     [
//       "click",
//       "mousedown",
//       "mouseup",
//       "dblclick",
//       "contextmenu",
//       "keydown",
//       "keyup",
//       "keypress",
//       "touchstart",
//       "touchend",
//       "pointerdown",
//       "pointerup",
//     ].forEach(function (eventName) {
//       overlay.removeEventListener(eventName, overlay._customBlockHandler, true);
//       document.body.removeEventListener(
//         eventName,
//         overlay._customBlockHandler,
//         true
//       );
//       alertBox.removeEventListener(
//         eventName,
//         overlay._customBlockHandler,
//         true
//       );
//     });
//     delete overlay._customBlockHandler;
//   }

//   function freezePage() {
//     document.body.style.overflow = "hidden";
//     enableOverlayCapture();
//   }

//   function unfreezePage() {
//     document.body.style.overflow = "";
//     disableOverlayCapture();
//   }

//   // --- دعم تفعيل زر ok بالـ Enter ---
//   let enterPressed = false;
//   let lastOkBtn = null;
//   function enableEnterForOk(okBtn) {
//     lastOkBtn = okBtn;
//     document.addEventListener("keydown", handleEnterDown, true);
//     document.addEventListener("keyup", handleEnterUp, true);
//   }
//   function disableEnterForOk() {
//     document.removeEventListener("keydown", handleEnterDown, true);
//     document.removeEventListener("keyup", handleEnterUp, true);
//     if (lastOkBtn) lastOkBtn.classList.remove("active44");
//     enterPressed = false;
//     lastOkBtn = null;
//   }
//   function handleEnterDown(e) {
//     if (e.key === "Enter") {
//       if (lastOkBtn && !enterPressed) {
//         lastOkBtn.classList.add("active44");
//         enterPressed = true;
//       }
//     }
//   }
//   function handleEnterUp(e) {
//     if (e.key === "Enter") {
//       if (lastOkBtn && enterPressed) {
//         lastOkBtn.classList.remove("active44");
//         lastOkBtn.click();
//         enterPressed = false;
//       }
//     }
//   }
//   // --- نهاية دعم Enter ---

//   // دالة رئيسية لإظهار نافذة مخصصة لكل أنواع الرسائل
//   function showCustomAlert({
//     msg,
//     type = "alert",
//     defaultText = "",
//     onOk,
//     onCancel,
//   }) {
//     const overlay = document.getElementById("custom-alert-overlay");
//     const box = document.getElementById("custom-alert-box");
//     const messageBox = document.getElementById("custom-alert-message");
//     const okBtn = document.getElementById("custom-alert-ok");
//     const cancelBtn = document.getElementById("custom-alert-cancel");
//     const iconBox = document.getElementById("custom-alert-icon");
//     const titleBox = document.getElementById("custom-alert-title");

//     // إزالة أي input قديم
//     const oldInput = box.querySelector("input[data-custom-input]");
//     if (oldInput) oldInput.remove();

//     // إعداد صورة الخلفية حسب النوع
//     let iconUrl = icons[type] || icons.default;
//     iconBox.style.backgroundImage = `url('${iconUrl}')`;

//     // تعيين العنوان
//     titleBox.textContent = getPageTitle();

//     messageBox.textContent = msg;

//     let input = null;
//     if (type === "prompt") {
//       input = document.createElement("input");
//       input.type = "text";
//       input.value = defaultText;
//       input.setAttribute("data-custom-input", "true");
//       box.insertBefore(input, okBtn);

//       setTimeout(() => {
//         input.focus();
//         input.select();
//       }, 10);
//     }

//     cancelBtn.style.display =
//       type === "confirm" || type === "prompt" ? "inline-block" : "none";

//     overlay.style.display = "flex";
//     setBlueDotFavicon();
//     freezePage();
//     enableEnterForOk(okBtn);

//     okBtn.onclick = () => {
//       overlay.style.display = "none";
//       restoreFavicon();
//       unfreezePage();
//       disableEnterForOk();
//       if (input) input.remove();
//       if (typeof onOk === "function") {
//         if (type === "prompt") onOk(input.value);
//         else if (type === "confirm") onOk(true);
//         else onOk();
//       }
//     };

//     cancelBtn.onclick = () => {
//       overlay.style.display = "none";
//       restoreFavicon();
//       unfreezePage();
//       disableEnterForOk();
//       if (input) input.remove();
//       if (typeof onCancel === "function") {
//         if (type === "prompt") onCancel(null);
//         else if (type === "confirm") onCancel(false);
//       }
//     };
//   }

//   // تجاوز alert الافتراضية
//   window.alert = function (msg) {
//     showCustomAlert({ msg, type: "alert" });
//   };

//   // تجاوز confirm الافتراضية
//   window.confirm = function (msg) {
//     return new Promise((resolve) => {
//       showCustomAlert({
//         msg,
//         type: "confirm",
//         onOk: () => resolve(true),
//         onCancel: () => resolve(false),
//       });
//     });
//   };

//   // تجاوز prompt الافتراضية
//   window.prompt = function (msg, defaultText = "") {
//     return new Promise((resolve) => {
//       showCustomAlert({
//         msg,
//         type: "prompt",
//         defaultText,
//         onOk: (val) => resolve(val),
//         onCancel: () => resolve(null),
//       });
//     });
//   };

//   // تجاوز console.log
//   console._oldLog = console.log;
//   console._oldWarn = console.warn;
//   console._oldError = console.error;

//   console.log = function (...args) {
//     showCustomAlert({ msg: args.join(" "), type: "log" });
//     console._oldLog.apply(console, args);
//   };

//   console.warn = function (...args) {
//     showCustomAlert({ msg: args.join(" "), type: "warn" });
//     console._oldWarn.apply(console, args);
//   };

//   console.error = function (...args) {
//     showCustomAlert({ msg: args.join(" "), type: "error" });
//     console._oldError.apply(console, args);
//   };
// });