const address = "Štúrova 21, 066 01 Humenné, Slovakia";
	  
function openMap(mapChoice) {
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  // Detect if the device can use Apple Maps
  const isAppleDevice = /(Mac|iPhone|iPad|iPod)/i.test(navigator.platform);

  if (mapChoice === "apple") {
    if (isAppleDevice) {
      // Try opening Apple Maps application
      window.location.href = `maps://?q=${encodeURIComponent(address)}`;
    } else {
      // Fallback: Open Apple Maps in a browser
      window.open(appleMapsUrl, "_blank");
    }
  } else if (mapChoice === "google") {
    if (navigator.userAgent.toLowerCase().includes("android") || !isAppleDevice) {
      // Open Google Maps app if possible
      window.location.href = `geo:0,0?q=${encodeURIComponent(address)}`;
    } else {
      // Fallback: Open Google Maps in a browser
      window.open(googleMapsUrl, "_blank");
    }
  } else {
    console.error("Invalid map choice. Use 'apple' or 'google'.");
  }
}