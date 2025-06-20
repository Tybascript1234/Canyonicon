document.addEventListener("DOMContentLoaded", async () => {
  const forbiddenKeywords = ["beer"]; // قائمة بالكلمات المحظورة
  const galleryContainer = document.getElementById("gallery");
  const category1Container = document.getElementById("category1");
  const category2Container = document.getElementById("category2");
  const category3Container = document.getElementById("category3");
  const searchInput = document.getElementById("searchInput");
  const searchInput2 = document.getElementById("searchInput2");
  const searchResults = document.getElementById("searchResults");
  const clearButton = document.getElementById("clearButton");
  const downloadPopup = document.getElementById("downloadPopup");
  const popupImage = document.getElementById("popupImage");
  const popupName = document.getElementById("popupName");
  const colorPicker = document.getElementById("colorPicker");
  const searchFormat = document.getElementById("searchFormat");
  const toggleDownloadCounts = document.getElementById("toggleDownloadCounts");
  const downloadCounts = document.getElementById("downloadCounts");
  const totalDownloads = document.getElementById("totalDownloads");
  const containerCount = document.getElementById("containerCount");
  const popupLinkInput = document.getElementById("popupLinkInput");
  const toggleIconsButton = document.getElementById("toggleIcons");
  const popupShareLink = document.getElementById("popupShareLink");
  const copyShareLinkButton = document.getElementById("copyShareLinkButton");

  // عناصر مؤشر التحميل
  const loadingIndicator = document.getElementById("loadingIndicator");
  const loadingProgress = document.getElementById("loadingProgress");
  const loadingText = document.getElementById("loadingText");
  const loadingPercent = document.getElementById("loadingPercent");
  const currentIconTypeText = document.getElementById("currentIconType");

  // تحميل أيقونات Ionicons من CDN
  const iconsData = await fetchIoniconsData();

  // تصنيف الأيقونات حسب النوع
  const categorizedIcons = {
    outline: [],
    filled: [],
    sharp: [],
  };

  // تصنيف الأيقونات مع تحديد أيقونات الـ logos
  iconsData.icons.forEach((icon) => {
    const isLogo = icon.name.includes("logo") || icon.name.includes("brand");
    const category = isLogo ? "category1" : "default";

    if (icon.name.endsWith("-outline")) {
      categorizedIcons.outline.push({
        imageUrl: `https://unpkg.com/ionicons@7.1.0/dist/svg/${icon.name}.svg`,
        name: icon.name.replace("-outline", ""),
        category: category,
        isLogo: isLogo,
        type: "outline",
      });
    } else if (icon.name.endsWith("-sharp")) {
      categorizedIcons.sharp.push({
        imageUrl: `https://unpkg.com/ionicons@7.1.0/dist/svg/${icon.name}.svg`,
        name: icon.name.replace("-sharp", ""),
        category: category,
        isLogo: isLogo,
        type: "sharp",
      });
    } else {
      categorizedIcons.filled.push({
        imageUrl: `https://unpkg.com/ionicons@7.1.0/dist/svg/${icon.name}.svg`,
        name: icon.name,
        category: category,
        isLogo: isLogo,
        type: "filled",
      });
    }
  });

  // دعم الإيموجي
  const emojiImages = [];
  let images = [
    ...categorizedIcons.outline,
    ...categorizedIcons.filled,
    ...categorizedIcons.sharp,
  ];

  // تحميل الإيموجي
  async function loadTwemojiToCategory2() {
    const forbiddenEmojiKeywords = [
      "beer",
      "alcohol",
      "wine",
      "drug",
      "smoke",
      "gun",
      "knife",
      "bomb",
    ];
    try {
      const response = await fetch(
        "https://unpkg.com/emoji.json@13.1.0/emoji.json"
      );
      const emojiData = await response.json();

      const filteredEmojis = emojiData
        .filter(
          (emoji) =>
            !forbiddenEmojiKeywords.some((keyword) =>
              emoji.name.toLowerCase().includes(keyword.toLowerCase())
            )
        )
        .slice(0, 500);

      function toCodePoint(unicodeSurrogates, sep = "-") {
        const r = [];
        let c = 0,
          p = 0,
          i = 0;
        while (i < unicodeSurrogates.length) {
          c = unicodeSurrogates.charCodeAt(i++);
          if (p) {
            r.push(((p - 0xd800) << 10) + (c - 0xdc00) + 0x10000);
            p = 0;
          } else if (0xd800 <= c && c <= 0xdbff) {
            p = c;
          } else {
            r.push(c);
          }
        }
        return r.map((c) => c.toString(16)).join(sep);
      }

      filteredEmojis.forEach((emoji) => {
        const code = toCodePoint(emoji.char);
        const imageUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${code}.png`;

        emojiImages.push({
          imageUrl,
          name: emoji.name,
          isLogo: false,
          type: "emoji",
          isEmoji: true,
          category: "category2",
        });
      });
    } catch (error) {
      console.error("Error loading Twemoji:", error);
      category2Container.innerHTML = `<div class="error">Failed to load emojis</div>`;
    }
  }

  // تحديث images مع الإيموجي
  function updateImagesWithEmojis() {
    images = [
      ...categorizedIcons.outline,
      ...categorizedIcons.filled,
      ...categorizedIcons.sharp,
      ...emojiImages,
    ];
  }

  await loadTwemojiToCategory2();
  updateImagesWithEmojis();

  let downloadData = JSON.parse(localStorage.getItem("downloadData")) || {};
  const originalSources = new Map();
  let currentIconType = "outline"; // النوع الافتراضي للأيقونات
  let isIconLoading = false; // متغير لتتبع حالة التحميل
  let currentSelectedResultIndex = -1; // لتتبع العنصر المحدد في نتائج البحث

  // تبديل الأيقونات
  const iconTypeButtons = document.querySelectorAll(".icon-type-btn");
  document
    .querySelector(`.icon-type-btn[data-type="${currentIconType}"]`)
    .classList.add("zoom");

  iconTypeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (isIconLoading) return;

      isIconLoading = true;
      iconTypeButtons.forEach((btn) => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
      });

      iconTypeButtons.forEach((btn) => {
        btn.classList.remove("zoom");
        btn.style.transform = "";
        btn.style.boxShadow = "";
      });
      button.classList.add("zoom");
      currentIconType = button.dataset.type;
      currentIconTypeText.textContent =
        currentIconType.charAt(0).toUpperCase() + currentIconType.slice(1);

      await displayImages();

      iconTypeButtons.forEach((btn) => {
        btn.disabled = false;
        btn.style.opacity = "1";
      });
      isIconLoading = false;
    });
  });

  const iconCache = {
    outline: null,
    filled: null,
    sharp: null,
  };

  function syncSearchInputs(event) {
    if (event.target === searchInput) {
      searchInput2.value = searchInput.value;
    } else {
      searchInput.value = searchInput2.value;
    }
    displayImages();
  }

  searchInput.addEventListener("input", syncSearchInputs);
  searchInput2.addEventListener("input", syncSearchInputs);
  searchInput.addEventListener("keydown", handleSearchNavigation);
  searchInput2.addEventListener("keydown", handleSearchNavigation);

  function handleSearchNavigation(e) {
    const resultItems = document.querySelectorAll(".result-item");
    if (resultItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentSelectedResultIndex < resultItems.length - 1) {
        currentSelectedResultIndex++;
        updateSelectedResult(resultItems);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentSelectedResultIndex > 0) {
        currentSelectedResultIndex--;
        updateSelectedResult(resultItems);
      }
    } else if (e.key === "Enter" && currentSelectedResultIndex >= 0) {
      e.preventDefault();
      resultItems[currentSelectedResultIndex].click();
    }
  }

  function updateSelectedResult(resultItems) {
    resultItems.forEach((item, index) => {
      if (index === currentSelectedResultIndex) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("selected");
      }
    });
  }

  function handleSearchResults(show) {
    if (show) {
      searchResults.style.display = "block";
      currentSelectedResultIndex = -1;
      searchInput.style.borderRadius = "30px 30px 0px 0px";
      searchInput2.style.borderRadius = "8px";
    } else {
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      searchInput.style.borderRadius = "";
      searchInput2.style.borderRadius = "";
    }
  }

  function updateAllImages() {
    updateGalleryImages();
    updatePopupImage();
    updateDownloadPopupImage();
  }

  function updateGalleryImages() {
    const imageContainers = document.querySelectorAll(".image-container");
    imageContainers.forEach((container) => {
      const img = container.querySelector("img");
      if (img) {
        let currentSrc = img.dataset.originalImage || img.src;

        // لا تحديث للإيموجي
        if (img.src.includes("twemoji")) return;

        if (currentSrc && !img.dataset.emoji) {
          let newSrc = currentSrc;

          if (currentIconType === "filled") {
            newSrc = currentSrc.includes("-outline.")
              ? currentSrc.replace("-outline.", ".")
              : currentSrc.includes("-sharp.")
              ? currentSrc.replace("-sharp.", ".")
              : currentSrc;
          } else if (currentIconType === "outline") {
            newSrc =
              currentSrc.includes(".") &&
              !currentSrc.includes("-outline.") &&
              !currentSrc.includes("-sharp.")
                ? currentSrc.replace(".", "-outline.")
                : currentSrc.includes("-sharp.")
                ? currentSrc.replace("-sharp.", "-outline.")
                : currentSrc;
          } else if (currentIconType === "sharp") {
            newSrc =
              currentSrc.includes(".") &&
              !currentSrc.includes("-sharp.") &&
              !currentSrc.includes("-outline.")
                ? currentSrc.replace(".", "-sharp.")
                : currentSrc.includes("-outline.")
                ? currentSrc.replace("-outline.", "-sharp.")
                : currentSrc;
          }

          updateImageSource(img, newSrc);
        }
      }
    });
  }

  function updatePopupImage() {
    const popupImg = document.getElementById("popupImage");
    if (popupImg) {
      let currentSrc = popupImg.dataset.originalImage || popupImg.src;

      if (popupImg.src.includes("twemoji")) return;

      if (currentSrc && !popupImg.dataset.emoji) {
        let newSrc = currentSrc;

        if (currentIconType === "filled") {
          newSrc = currentSrc.includes("-outline.")
            ? currentSrc.replace("-outline.", ".")
            : currentSrc.includes("-sharp.")
            ? currentSrc.replace("-sharp.", ".")
            : currentSrc;
        } else if (currentIconType === "outline") {
          newSrc =
            currentSrc.includes(".") &&
            !currentSrc.includes("-outline.") &&
            !currentSrc.includes("-sharp.")
              ? currentSrc.replace(".", "-outline.")
              : currentSrc.includes("-sharp.")
              ? currentSrc.replace("-sharp.", "-outline.")
              : currentSrc;
        } else if (currentIconType === "sharp") {
          newSrc =
            currentSrc.includes(".") &&
            !currentSrc.includes("-sharp.") &&
            !currentSrc.includes("-outline.")
              ? currentSrc.replace(".", "-sharp.")
              : currentSrc.includes("-outline.")
              ? currentSrc.replace("-outline.", "-sharp.")
              : currentSrc;
        }

        fetch(newSrc)
          .then((response) => response.text())
          .then((svgContent) => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
            const svgElement = svgDoc.querySelector("svg");

            if (svgElement) {
              const selectedColor =
                document.getElementById("colorPicker").value;
              svgElement.setAttribute("fill", selectedColor);

              const serializer = new XMLSerializer();
              const coloredSVG = serializer.serializeToString(svgElement);

              const blob = new Blob([coloredSVG], { type: "image/svg+xml" });
              const objectURL = URL.createObjectURL(blob);

              popupImg.src = objectURL;
              popupImg.dataset.originalImage = newSrc;
            }
          })
          .catch((err) =>
            console.error("Error fetching or processing SVG:", err)
          );
      }
    }
  }

  function updateDownloadPopupImage() {
    const downloadPopup = document.getElementById("downloadPopup");
    if (downloadPopup && downloadPopup.style.display !== "none") {
      const popupImg = document.getElementById("popupImage");
      if (popupImg) {
        let currentSrc = popupImg.dataset.originalImage || popupImg.src;

        if (popupImg.src.includes("twemoji")) return;

        if (currentSrc && !popupImg.dataset.emoji) {
          let newSrc = currentSrc;

          if (currentIconType === "filled") {
            newSrc = currentSrc.includes("-outline.")
              ? currentSrc.replace("-outline.", ".")
              : currentSrc.includes("-sharp.")
              ? currentSrc.replace("-sharp.", ".")
              : currentSrc;
          } else if (currentIconType === "outline") {
            newSrc =
              currentSrc.includes(".") &&
              !currentSrc.includes("-outline.") &&
              !currentSrc.includes("-sharp.")
                ? currentSrc.replace(".", "-outline.")
                : currentSrc.includes("-sharp.")
                ? currentSrc.replace("-sharp.", "-outline.")
                : currentSrc;
          } else if (currentIconType === "sharp") {
            newSrc =
              currentSrc.includes(".") &&
              !currentSrc.includes("-sharp.") &&
              !currentSrc.includes("-outline.")
                ? currentSrc.replace(".", "-sharp.")
                : currentSrc.includes("-outline.")
                ? currentSrc.replace("-outline.", "-sharp.")
                : currentSrc;
          }

          const img = new Image();
          img.onload = function () {
            popupImg.src = newSrc;
            popupImg.dataset.originalImage = newSrc;
          };
          img.src = newSrc;
        }
      }
    }
  }

  function updateImageSource(element, newSrc) {
    if (!element || element.tagName !== "IMG") return;

    const img = new Image();
    img.onload = function () {
      element.src = newSrc;
      element.dataset.originalImage = newSrc;
    };
    img.src = newSrc;
  }

  function updatePopupDownloadLinks(newSrc) {
    if (popupLinkInput) {
      popupLinkInput.value = newSrc;
    }
  }

  function updateTotalDownloads() {
    const total = Object.values(downloadData).reduce(
      (sum, count) => sum + count,
      0
    );
    totalDownloads.textContent = total;
  }

  function saveDownloadData() {
    localStorage.setItem("downloadData", JSON.stringify(downloadData));
    updateTotalDownloads();
  }

  function displayDownloadCounts() {
    downloadCounts.innerHTML = "";
    const sortedEntries = Object.entries(downloadData).sort(
      (a, b) => b[1] - a[1]
    );
    for (const [imageName, count] of sortedEntries) {
      const countDiv = document.createElement("div");
      countDiv.textContent = `${imageName}: ${count}`;
      downloadCounts.appendChild(countDiv);
    }
  }

  async function displayImages() {
    galleryContainer.innerHTML = "";
    category1Container.innerHTML = "";
    category2Container.innerHTML = "";
    category3Container.innerHTML = "";
    const searchText = searchInput.value.trim().toLowerCase();
    const resultsFragment = document.createDocumentFragment();

    let filteredImages = images.filter((imageData) => {
      const matchesSearch = imageData.name.toLowerCase().includes(searchText);

      // دعم البحث عن الإيموجي
      if (imageData.isEmoji) {
        return matchesSearch;
      }

      const matchesForbidden = forbiddenKeywords.some((keyword) =>
        imageData.name.toLowerCase().includes(keyword)
      );

      if (matchesForbidden) {
        return false;
      }

      if (imageData.isLogo) {
        return matchesSearch;
      }

      const matchesType =
        (currentIconType === "outline" && imageData.type === "outline") ||
        (currentIconType === "sharp" && imageData.type === "sharp") ||
        (currentIconType === "filled" && imageData.type === "filled");

      return matchesSearch && matchesType;
    });

    // تحديث عدد الصور بعد الفلترة
    containerCount.textContent = filteredImages.length;

    await renderIcons(filteredImages);
  }

async function renderIcons(filteredImages) {
  loadingIndicator.style.display = "block";
  currentIconTypeText.textContent =
    currentIconType.charAt(0).toUpperCase() + currentIconType.slice(1);

  let loadedCount = 0;
  const totalCount = filteredImages.length;

  function updateProgress() {
    loadedCount++;
    const percent = Math.round((loadedCount / totalCount) * 100);
    loadingProgress.style.width = percent + "%";
    loadingPercent.textContent = percent + "%";

    if (loadedCount === totalCount) {
      setTimeout(() => {
        loadingIndicator.style.display = "none";
      }, 500);
    }
  }

  const batchSize = 50;
  const resultsFragment = document.createDocumentFragment();

  window.addEventListener(
    "contextmenu",
    function (e) {
      if (e.target.closest(".image-container")) {
        e.preventDefault();
      }
    },
    false
  );

  // اجمع صور الإيموجي التي بها خطأ لتحذفها لاحقًا
  let emojiImagesToRemove = [];
  let actuallyRenderedCount = 0; // عدد الصور التي تظهر فعلاً

  for (let i = 0; i < filteredImages.length; i += batchSize) {
    const batch = filteredImages.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (imageData) => {
        const { imageUrl, name, category, isLogo, isEmoji } = imageData;

        const imageContainer = document.createElement("button");
        imageContainer.className = "image-container";

        const rreDiv = document.createElement("div");
        rreDiv.id = "rre";
        rreDiv.style.display = "flex";
        rreDiv.style.justifyContent = "center";
        rreDiv.style.alignItems = "center";
        imageContainer.appendChild(rreDiv);

        const imgElement = document.createElement("img");
        imgElement.className = "svg-icon";
        imgElement.loading = "lazy";
        imgElement.style.opacity = "1";
        imgElement.src = imageUrl;
        imgElement.dataset.originalImage = imageUrl;
        imgElement.dataset.isLogo = isLogo;
        imgElement.alt = name;
        if (isEmoji) imgElement.dataset.emoji = "true";

        let valid = true;

        imgElement.onload = function () {
          rreDiv.remove();
          // فقط إذا لم تكن بها خطأ أضفها للعداد
          actuallyRenderedCount++;
          // تحديث العدد مباشرة لجعل العدد ديناميكي أثناء التحميل
          containerCount.textContent = actuallyRenderedCount;
        };

        imgElement.onerror = function () {
          rreDiv.remove();
          valid = false;
          if (isEmoji) {
            emojiImagesToRemove.push(imageUrl);
            imageContainer.remove();
          }
        };

        const nameElement = document.createElement("div");
        nameElement.className = "image-name";
        nameElement.textContent = name;
        nameElement.title = name;

        const downloadButton = document.createElement("button");
        downloadButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>';
        downloadButton.className = "download-btn";
        downloadButton.addEventListener("click", (event) => {
          if (isEmoji) {
            showDownloadPopup(event, imgElement.src, name, false, true);
          } else {
            showDownloadPopup(
              event,
              imgElement.dataset.originalImage,
              name,
              isLogo
            );
          }
        });

        imageContainer.appendChild(imgElement);
        imageContainer.appendChild(nameElement);
        imageContainer.appendChild(downloadButton);
        imageContainer.addEventListener("click", (event) => {
          event.stopPropagation();
          copyImageName(nameElement);
        });

        function copyImageName(nameElement) {
          const originalName = nameElement.textContent;
          nameElement.textContent = "Copied!";

          navigator.clipboard
            .writeText(originalName)
            .then(() => {
              console.log("Text copied to clipboard");
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
            });

          setTimeout(() => {
            nameElement.textContent = originalName;
          }, 1000);
        }

        if (category === "category1") {
          category1Container.appendChild(imageContainer);
        } else if (category === "category2") {
          category2Container.appendChild(imageContainer);
        } else if (category === "category3") {
          category3Container.appendChild(imageContainer);
        } else {
          galleryContainer.appendChild(imageContainer);
        }

        updateProgress();
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  // بعد انتهاء التحميل، احذف صور الإيموجي التي بها خطأ من emojiImages و images
  if (emojiImagesToRemove.length > 0) {
    for (const url of emojiImagesToRemove) {
      const idx = emojiImages.findIndex(e => e.imageUrl === url);
      if (idx !== -1) emojiImages.splice(idx, 1);
    }
    images = [
      ...categorizedIcons.outline,
      ...categorizedIcons.filled,
      ...categorizedIcons.sharp,
      ...emojiImages
    ];
  }
  // تأكد أن العدد النهائي بعد الفلترة هو فقط عدد الصور التي تم تحميلها بنجاح
  containerCount.textContent = actuallyRenderedCount;

  // إنشاء عناصر نتائج البحث
  searchResults.innerHTML = "";

  if (actuallyRenderedCount === 0 && searchInput.value.trim() !== "") {
    const noResultsItem = document.createElement("div");
    noResultsItem.className = "no-results";
    noResultsItem.innerHTML = '<span class="eerr" title="لا توجد نتائج">(^-^*)</span> لا توجد نتائج';
    searchResults.appendChild(noResultsItem);
  } else if (searchInput.value.trim() !== "") {
    // فقط أضف النتائج للصور الظاهرة فعلاً
    let renderedIndex = 0;
    filteredImages.forEach((imageData) => {
      const { name, imageUrl } = imageData;
      // لا تضف النتائج إلا إذا الصورة نجحت (موجودة في emojiImages/filteredImages ولم تُحذف)
      // لكن هنا لا يمكنك التأكد 100% إلا إذا ربطت الرقم أعلاه بالصور هنا
      // للحل السريع: لو أردت إظهار النتائج فقط بقدر actuallyRenderedCount (الأولى فقط)
      // لكن في أغلب الحالات لن تظهر نتائج غير موجودة لأن الصور المحذوفة تُحذف من filteredImages في الدوران القادم

      if (renderedIndex < actuallyRenderedCount) {
        const resultItem = document.createElement("button");
        resultItem.className = "result-item ripple-btn";
        resultItem.setAttribute("onmousedown", "createRipple(event)");

        resultItem.innerHTML = `
          <div class="result-item-content">
              <div class="result-thumbnail-container">
                  <img src="${imageUrl}" 
                      alt="${name}" 
                      class="result-thumbnail"
                      loading="lazy"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      height="22" 
                      viewBox="0 -960 960 960" 
                      width="22" 
                      fill="#1f1f1f" 
                      class="search-icon fallback-icon">
                      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                  </svg>
              </div>
              <div class="result-name">${name}</div>
          </div>
        `;

        resultItem.addEventListener("click", (e) => {
          if (!e.target.classList.contains("result-action-btn")) {
            searchInput.value = name;
            searchInput2.value = name;
            searchResults.style.display = "none";
            searchInput.style.borderRadius = "";
            searchInput2.style.borderRadius = "";
            displayImages();
          }
        });

        resultsFragment.appendChild(resultItem);
        renderedIndex++;
      }
    });

    searchResults.appendChild(resultsFragment);
  }
}

  async function fetchIoniconsData() {
    try {
      const response = await fetch(
        "https://unpkg.com/ionicons@7.1.0/dist/ionicons.json"
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching Ionicons data:", error);
      return { icons: [] };
    }
  }

  // === مشاركة الرابط مع دعم خصائص الإيموجي ===
  function generateShareableLink(imageUrl, name, isEmoji = false) {
    const baseUrl = window.location.origin + window.location.pathname;
    const encodedUrl = encodeURIComponent(imageUrl);
    const encodedName = encodeURIComponent(name);
    let category = "all";
    let emojiParam = isEmoji ? "&isEmoji=1" : "";
    const iconData = images.find((img) => img.imageUrl === imageUrl);
    if (iconData) {
      category = iconData.category || "all";
      if (iconData.isEmoji) emojiParam = "&isEmoji=1";
    }
    return `${baseUrl}?popup=1&image=${encodedUrl}&name=${encodedName}&type=${currentIconType}&category=${category}${emojiParam}`;
  }

  function showShareableLink(imageUrl, name, isEmoji = false) {
    const shareLink = generateShareableLink(imageUrl, name, isEmoji);
    if (popupShareLink) {
      popupShareLink.value = shareLink;
    }
    if (copyShareLinkButton) {
      copyShareLinkButton.onclick = function () {
        navigator.clipboard.writeText(shareLink);
      };
    }
    window.history.pushState({}, "", shareLink);
  }

  function checkForPopupOnLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const popupParam = urlParams.get("popup");
    const imageParam = urlParams.get("image");
    const nameParam = urlParams.get("name");
    const typeParam = urlParams.get("type");
    const categoryParam = urlParams.get("category");
    const isEmojiParam = urlParams.get("isEmoji");

    if (popupParam === "1" && imageParam && nameParam) {
      const decodedImage = decodeURIComponent(imageParam);
      const decodedName = decodeURIComponent(nameParam);
      const isEmoji = isEmojiParam === "1";

      if (typeParam && ["outline", "filled", "sharp"].includes(typeParam)) {
        currentIconType = typeParam;
        document.querySelectorAll(".icon-type-btn").forEach((btn) => {
          btn.classList.remove("zoom");
          if (btn.dataset.type === currentIconType) {
            btn.classList.add("zoom");
            btn.style.transition = "all 0.3s ease";
          }
        });
        currentIconTypeText.textContent =
          currentIconType.charAt(0).toUpperCase() + currentIconType.slice(1);
      }
      if (categoryParam) {
        document
          .querySelectorAll(".category-navigation button")
          .forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.category === categoryParam) {
              btn.classList.add("active");
            }
          });
      }

      setTimeout(() => {
        showDownloadPopup(
          {
            stopPropagation: () => {},
            target: document.querySelector(".image-container"),
          },
          decodedImage,
          decodedName,
          false,
          isEmoji
        );
      }, 500);

      setTimeout(() => {
        displayImages();
      }, 300);
    }
  }

  await displayImages();

  function handleSearchEvents(searchField) {
    const searchText = searchField.value.trim();
    if (searchText !== "") {
      displayImages();
      handleSearchResults(true);
    } else {
      handleSearchResults(false);
      displayImages();
    }
    clearButton.style.display = searchText !== "" ? "flex" : "none";
  }

  searchInput.addEventListener("input", () => handleSearchEvents(searchInput));
  searchInput2.addEventListener("input", () => handleSearchEvents(searchInput2));

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchInput2.value = "";
    displayImages();
    handleSearchResults(false);
    clearButton.style.display = "none";
  });

  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !searchInput2.contains(event.target) &&
      !searchResults.contains(event.target)
    ) {
      handleSearchResults(false);
    }
  });

  function showDownloadPopup(event, imageUrl, name, isLogo = false, isEmoji = false) {
    event.stopPropagation();

    const downloadPopup = document.getElementById("downloadPopup");
    const popupImage = document.getElementById("popupImage");
    const popupName = document.getElementById("popupName");
    const popupLinkInput = document.getElementById("popupLinkInput");
    const popupPngInput = document.getElementById("popupPngInput");
    const popupSvgInput = document.getElementById("popupSvgInput");
    const colorPicker = document.getElementById("colorPicker");

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#00000021";
    overlay.style.zIndex = 999;

    document.body.appendChild(overlay);

    let displayImageUrl = imageUrl;
    if (!isLogo && !isEmoji) {
      if (currentIconType === "filled") {
        displayImageUrl = imageUrl.includes("-outline.")
          ? imageUrl.replace("-outline.", ".")
          : imageUrl.includes("-sharp.")
          ? imageUrl.replace("-sharp.", ".")
          : imageUrl;
      } else if (currentIconType === "outline") {
        displayImageUrl =
          imageUrl.includes(".") &&
          !imageUrl.includes("-outline.") &&
          !imageUrl.includes("-sharp.")
            ? imageUrl.replace(".", "-outline.")
            : imageUrl.includes("-sharp.")
            ? imageUrl.replace("-sharp.", "-outline.")
            : imageUrl;
      } else if (currentIconType === "sharp") {
        displayImageUrl =
          imageUrl.includes(".") &&
          !imageUrl.includes("-sharp.") &&
          !imageUrl.includes("-outline.")
            ? imageUrl.replace(".", "-sharp.")
            : imageUrl.includes("-outline.")
            ? imageUrl.replace("-outline.", "-sharp.")
            : imageUrl;
      }
    }

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = displayImageUrl;

    img.onload = function () {
      const scaleFactor = Math.min(3, 2000 / img.width);
      tempCanvas.width = img.width * scaleFactor;
      tempCanvas.height = img.height * scaleFactor;

      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = "high";
      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

      popupImage.dataset.originalImage = displayImageUrl;
      popupImage.dataset.originalCanvas = tempCanvas.toDataURL();
      popupImage.src = displayImageUrl;
      popupName.textContent = name;
      popupLinkInput.value = displayImageUrl;
      popupPngInput.value = tempCanvas.toDataURL("image/png");

      if (!isEmoji && displayImageUrl.endsWith(".svg")) {
        fetch(displayImageUrl)
          .then((response) => response.text())
          .then((svgCode) => {
            popupSvgInput.value = svgCode;
          })
          .catch((err) => {
            console.error("Error fetching SVG:", err);
            popupSvgInput.value = "SVG code not available";
          });
      } else {
        popupSvgInput.value = "SVG code not available";
      }

      showShareableLink(displayImageUrl, name, isEmoji);

      downloadPopup.style.display = "block";
      downloadPopup.style.opacity = 0;
      downloadPopup.style.transform = "translateX(100%)";
      downloadPopup.style.position = "fixed";
      downloadPopup.style.zIndex = 1000;

      setTimeout(() => {
        downloadPopup.style.transition =
          "transform 0.5s ease, opacity 0.5s ease";
        downloadPopup.style.opacity = 1;
        downloadPopup.style.transform = "translateX(0)";
      }, 10);

      [
        "downloadSVG",
        "downloadPDF",
        "downloadWEBP",
        "downloadGIF",
        "downloadMP4",
        "downloadTDS",
        "downloadTIFF",
        "downloadTGA",
        "downloadBMP",
        "downloadICO",
        "downloadDXF",
        "downloadRAW",
        "downloadEMF",
        "downloadPPM",
        "downloadJPG",
      ].forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.style.display = isEmoji ? "none" : "";
      });
      const pngBtn = document.getElementById("downloadPNG");
      if (pngBtn) pngBtn.style.display = "";

      if (!isEmoji) {
        colorPicker.disabled = false;
        colorPicker.addEventListener("input", () => {
          const originalImg = new Image();
          originalImg.crossOrigin = "Anonymous";
          originalImg.onload = function () {
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempCtx.drawImage(
              originalImg,
              0,
              0,
              tempCanvas.width,
              tempCanvas.height
            );
            applyColorToCanvas(tempCanvas, colorPicker.value);
            popupImage.src = tempCanvas.toDataURL();
            popupPngInput.value = tempCanvas.toDataURL("image/png");
          };
          originalImg.onerror = function () {
            console.error("Failed to load image with CORS");
          };
          originalImg.src =
            popupImage.dataset.originalImage +
            (popupImage.dataset.originalImage.includes("?") ? "&" : "?") +
            "timestamp=" +
            new Date().getTime();
        });
      } else {
        colorPicker.disabled = true;
      }

      const sizeButtons = {
        resize24: 24,
        resize28: 28,
        resize32: 32,
        resize36: 36,
        resize40: 40,
        resize44: 44,
        resize48: 48,
        resize52: 52,
      };

      Object.keys(sizeButtons).forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) {
          btn.addEventListener("click", () => {
            const size = sizeButtons[id];
            popupImage.style.width = `${size}px`;
            popupImage.style.height = `${size}px`;
            document.getElementById("sizeDisplay").textContent = size;
          });
        }
      });

      function closePopupHandler(e) {
        if (!downloadPopup.contains(e.target) && e.target !== event.target) {
          downloadPopup.style.transition =
            "transform 0.5s ease, opacity 0.5s ease";
          downloadPopup.style.opacity = 0;
          downloadPopup.style.transform = "translateX(100%)";
          setTimeout(() => {
            downloadPopup.style.display = "none";
            if (overlay && overlay.parentNode) {
              document.body.removeChild(overlay);
            }
            window.history.pushState({}, "", window.location.pathname);
          }, 500);
          document.removeEventListener("mousedown", closePopupHandler);
          document.removeEventListener("touchstart", closePopupHandler);
        }
      }

      document.addEventListener("mousedown", closePopupHandler);
      document.addEventListener("touchstart", closePopupHandler);

      const closeBtn = document.querySelector(".close-popup");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          downloadPopup.style.transition =
            "transform 0.5s ease, opacity 0.5s ease";
          downloadPopup.style.opacity = 0;
          downloadPopup.style.transform = "translateX(100%)";
          setTimeout(() => {
            downloadPopup.style.display = "none";
            document.body.removeChild(overlay);
            window.history.pushState({}, "", window.location.pathname);
          }, 500);
        });
      }
    };

    img.onerror = function () {
      console.error("Error loading image:", displayImageUrl);
      const fallbackImage = new Image();
      fallbackImage.onload = function () {
        popupImage.src = imageUrl;
        popupImage.dataset.originalImage = imageUrl;
        popupName.textContent = name;
        popupLinkInput.value = imageUrl;
        showShareableLink(imageUrl, name, isEmoji);

        downloadPopup.style.display = "block";
        downloadPopup.style.opacity = 0;
        downloadPopup.style.transform = "translateX(100%)";
        downloadPopup.style.position = "fixed";
        downloadPopup.style.zIndex = "1000";
        setTimeout(() => {
          downloadPopup.style.transition =
            "transform 0.5s ease, opacity 0.5s ease";
          downloadPopup.style.opacity = 1;
          downloadPopup.style.transform = "translateX(0)";
        }, 10);
      };
      fallbackImage.onerror = function () {
        console.error("Fallback image also failed to load:", imageUrl);
        popupImage.src =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="10" y="50" font-family="Arial" font-size="14" fill="red">Error loading image</text></svg>';
        popupName.textContent = name + " (Error)";
        downloadPopup.style.display = "block";
      };
      fallbackImage.src = imageUrl;
    };

    function copyToClipboard(textAreaId, buttonId) {
      const textArea = document.getElementById(textAreaId);
      const button = document.getElementById(buttonId);

      if (textArea && button) {
        navigator.clipboard
          .writeText(textArea.value)
          .then(() => {
            textArea.select();
            showCopySuccess(button);
            setTimeout(() => {
              window.getSelection().removeAllRanges();
              textArea.blur();
            }, 1000);
          })
          .catch((err) => console.error("Error copying text: ", err));
      }
    }

    function showCopySuccess(button) {
      let successMessage = document.createElement("span");
      successMessage.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 507.506 507.506" style="margin-right: 5px; fill: white;" width="12" height="12"><path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/></svg> تم النسخ!';

      successMessage.style.position = "absolute";
      successMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      successMessage.style.color = "#fff";
      successMessage.style.display = "flex";
      successMessage.style.alignItems = "center";
      successMessage.style.padding = "5px 10px";
      successMessage.style.borderRadius = "5px";
      successMessage.style.top = "-5px";
      successMessage.style.left = "50%";
      successMessage.style.transform = "translateX(-50%)";
      successMessage.style.fontSize = "12px";
      successMessage.style.transition = "opacity 0.5s";
      successMessage.style.zIndex = "1001";

      button.parentNode.style.position = "relative";
      button.parentNode.appendChild(successMessage);

      setTimeout(() => {
        successMessage.style.opacity = "0";
        setTimeout(() => successMessage.remove(), 500);
      }, 1500);
    }

    function setupEventListeners() {
      const buttons = {
        copySvgButton: "popupSvgInput",
        copyPngButton: "popupPngInput",
        copyLinkButton: "popupLinkInput",
        copyShareLinkButton: "popupShareLink",
      };

      Object.entries(buttons).forEach(([buttonId, textAreaId]) => {
        const button = document.getElementById(buttonId);
        if (button) {
          button.addEventListener("click", () =>
            copyToClipboard(textAreaId, buttonId)
          );
        }
      });
    }

    setupEventListeners();
  }

  function applyColorToCanvas(canvas, color) {
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = alpha;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  // ===== التعديلات الجديدة على وظائف التنزيل =====
  
  // دالة مساعدة لتنزيل الملف
  function triggerDownload(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // تنزيل صورة: إذا كانت إيموجي، استخدم فقط PNG
  function downloadImage(url, name, format) {
    const isEmoji = url.includes("twemoji");
    
    // معالجة الإيموجي بشكل منفصل (PNG فقط)
    if (isEmoji) {
      if (format !== "png") {
        alert("الإيموجي متاح للتنزيل بصيغة PNG فقط");
        return;
      }
      fallbackDownload(url, name, "png");
      return;
    }

    // معالجة الأيقونات العادية
    const selectedColor = colorPicker.value;
    
    if (format === "svg") {
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.text();
        })
        .then(svgData => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
          const svgElement = svgDoc.querySelector("svg");

          // تطبيق اللون المحدد على SVG
          const elements = svgElement.querySelectorAll("*");
          elements.forEach(el => {
            if (el.hasAttribute("fill") && el.getAttribute("fill") !== "none") {
              el.setAttribute("fill", selectedColor);
            }
            if (el.hasAttribute("stroke") && el.getAttribute("stroke") !== "none") {
              el.setAttribute("stroke", selectedColor);
            }
          });

          if (svgElement.getAttribute("fill") === null) {
            svgElement.setAttribute("fill", selectedColor);
          }

          const serializer = new XMLSerializer();
          const coloredSVG = serializer.serializeToString(svgElement);

          const blob = new Blob([coloredSVG], { type: "image/svg+xml" });
          const svgUrl = URL.createObjectURL(blob);
          triggerDownload(svgUrl, `${name}.svg`);
          URL.revokeObjectURL(svgUrl);

          updateDownloadCount(name);
        })
        .catch(error => {
          console.error("Error processing SVG:", error);
          fallbackDownload(url, name, "svg");
        });
    } else {
      // معالجة الصيغ الأخرى (PNG, JPG, etc.)
      handleDownload(format, name);
    }
  }

  function handleDownload(format, name, isLogo = false) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.onload = function() {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          if (!isLogo && !img.src.includes("twemoji")) {
            applyColorToCanvas(canvas, colorPicker.value);
          }

          let mimeType;
          switch(format) {
            case "jpg": mimeType = "image/jpeg"; break;
            case "png": mimeType = "image/png"; break;
            case "webp": mimeType = "image/webp"; break;
            default: mimeType = `image/${format}`;
          }

          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            
            const url = URL.createObjectURL(blob);
            triggerDownload(url, `${name}.${format}`);
            URL.revokeObjectURL(url);
            updateDownloadCount(name);
            resolve();
          }, mimeType, 1.0);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = function() {
        reject(new Error("Failed to load image"));
      };

      img.src = popupImage.dataset.originalImage + "?t=" + new Date().getTime();
    });
  }

  function updateDownloadCount(name) {
    if (!downloadData[name]) downloadData[name] = 0;
    downloadData[name]++;
    saveDownloadData();
    displayDownloadCounts();
  }

  function fallbackDownload(url, name, format) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = function() {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const dataUrl = canvas.toDataURL(`image/${format}`);
          triggerDownload(dataUrl, `${name}.${format}`);
          updateDownloadCount(name);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = function() {
        reject(new Error("Failed to load fallback image"));
      };
      
      img.src = url;
    });
  }

  // ===== نهاية التعديلات الجديدة =====

  searchFormat.addEventListener("input", () => {
    const formatSearchText = searchFormat.value.trim().toLowerCase();
    const buttons = document.querySelectorAll("#downloadPopup button");
    buttons.forEach((button) => {
      if (button.textContent.toLowerCase().includes(formatSearchText)) {
        button.style.display = "flex";
      } else {
        button.style.display = "none";
      }
    });
  });

  const openLinkButton = document.getElementById("openLinkButton");

  openLinkButton.addEventListener("click", () => {
    if (popupShareLink && popupShareLink.value) {
      window.open(popupShareLink.value, "_blank");
    } else {
      alert("الرابط غير متوفر.");
    }
  });

  document
    .getElementById("downloadSVG")
    .addEventListener("click", () =>
      downloadImage(popupLinkInput.value, popupName.textContent, "svg")
    );
  document
    .getElementById("downloadPNG")
    .addEventListener("click", () => {
      const url = popupImage.dataset.originalImage;
      const name = popupName.textContent;
      if (url && url.includes("twemoji")) {
        fallbackDownload(url, name, "png");
      } else {
        handleDownload("png", name);
      }
    });
  document
    .getElementById("downloadJPG")
    .addEventListener("click", () => handleDownload("jpg", popupName.textContent));
  document
    .getElementById("downloadWEBP")
    .addEventListener("click", () => handleDownload("webp", popupName.textContent));
  document
    .getElementById("downloadGIF")
    .addEventListener("click", () => handleDownload("gif", popupName.textContent));
  document
    .getElementById("downloadPDF")
    .addEventListener("click", () => handleDownload("pdf", popupName.textContent));
  document
    .getElementById("downloadMP4")
    .addEventListener("click", () => handleDownload("mp4", popupName.textContent));
  document
    .getElementById("downloadTDS")
    .addEventListener("click", () => handleDownload("tds", popupName.textContent));
  document
    .getElementById("downloadTIFF")
    .addEventListener("click", () => handleDownload("tiff", popupName.textContent));
  document
    .getElementById("downloadTGA")
    .addEventListener("click", () => handleDownload("tga", popupName.textContent));
  document
    .getElementById("downloadBMP")
    .addEventListener("click", () => handleDownload("bmp", popupName.textContent));
  document
    .getElementById("downloadICO")
    .addEventListener("click", () => handleDownload("ico", popupName.textContent));
  document
    .getElementById("downloadDXF")
    .addEventListener("click", () => handleDownload("dxf", popupName.textContent));
  document
    .getElementById("downloadRAW")
    .addEventListener("click", () => handleDownload("raw", popupName.textContent));
  document
    .getElementById("downloadEMF")
    .addEventListener("click", () => handleDownload("emf", popupName.textContent));
  document
    .getElementById("downloadPPM")
    .addEventListener("click", () => handleDownload("ppm", popupName.textContent));

  downloadCounts.style.display = downloadCounts.style.display || "none";

  toggleDownloadCounts.addEventListener("click", () => {
    if (
      downloadCounts.style.display === "none" ||
      downloadCounts.style.display === ""
    ) {
      downloadCounts.style.display = "block";
      displayDownloadCounts();
    } else {
      downloadCounts.style.display = "none";
    }
  });

  checkForPopupOnLoad();

  searchInput.focus();
  updateTotalDownloads();
});
