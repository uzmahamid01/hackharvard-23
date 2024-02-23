async function runAsyncCode() {

    // This is the default access token from ion account

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOTNmYmI2ZC02ZmI5LTQ0MmUtYTlmOC0yN2QxZmVhOTdlOGYiLCJpZCI6MTczMDY4LCJpYXQiOjE2OTc5MDUwMjV9.HS79Xg5R4euwQ7SSDuZfaeXnW3V0DYEciz8JvqbmdhQ'; // Replace with your actual access token

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.

    window.addEventListener('load', function () {
        // Wait for the page to fully load
        var imgElement = document.querySelector('img[title="Cesium ion"]');
        if (imgElement) {
          imgElement.parentNode.removeChild(imgElement);
        }
      });

      window.addEventListener('load', function () {
        // Wait for the page to fully load
        setTimeout(function () {
          var links = document.querySelectorAll('a[href="https://cesium.com/pricing/"][target="_blank"]');
          for (var i = 0; i < links.length; i++) {
            var link = links[i];
            link.parentNode.removeChild(link);
          }
        }, 500); // Adjust the delay (in milliseconds) as needed
      });

    const viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        terrain: Cesium.Terrain.fromWorldTerrain(),
        requestRenderMode : true,
        maximumRenderTimeChange : Infinity
    });

    // Function to perform the camera animation
    function animateCamera() {
        viewer.scene.light.intensity = 10.0;
        // Coordinates for the initial camera destination (zoom-in)
        const initialDestination = Cesium.Cartesian3.fromDegrees(-100.0, 49.0, 8500000); 
    
        // Coordinates for the final camera destination (zoom-out)
        const finalDestination = Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 18000000); 
    
        // Zoom in slowly
        viewer.camera.flyTo({
        destination: initialDestination,
        duration: 4, // 4 seconds
        complete: () => {
            viewer.scene.light.intensity = 1.0;
            }
        });
    
        // Delay for zooming out
        setTimeout(function() {
        // Zoom out quickly
        viewer.camera.flyTo({
            destination: finalDestination,
            duration: 1.5 // 2 seconds
        });
        }, 3000); // 10 seconds (10000 milliseconds)
    }

     // Call the function after some initial delay for viewer setup
     setTimeout(animateCamera, 350); // 2 seconds (2000 milliseconds)

    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 6000000;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 18000000;
     
    // Add your context menu event listener
    viewer.scene.canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
        const selectedLocation = convertScreenPixelToLocation(mousePosition);
        setMarkerInPos(selectedLocation);
    }, false);

    // Add a left-click event listener to get the coordinates
    const axios = require('axios');

    viewer.screenSpaceEventHandler.setInputAction(function (click) {
        const pickedLocation = viewer.scene.pickPosition(click.position);
        if (Cesium.defined(pickedLocation)) {
            // Sample the terrain to get the height relative to the ground
            Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [Cesium.Cartographic.fromCartesian(pickedLocation)]).then(function (updatedCartographics) {
                const cartographic = updatedCartographics[0];
                const longitude = Cesium.Math.toDegrees(cartographic.longitude);
                const latitude = Cesium.Math.toDegrees(cartographic.latitude);
                const heightAboveGround = 1000;
                const height = cartographic.height + heightAboveGround;
                console.log("Clicked at Longitude: " + longitude + ", Latitude: " + latitude + ", Height: " + height);

                // Create a JSON object with the coordinates
                const data = {
                    longitude: longitude,
                    latitude: latitude,
                    height: height
                };

                // Convert the data to JSON format
                const jsonData = JSON.stringify(data);

                const backendUrl = 'http://localhost:8080'; // Update with your back-end URL

                // Make an HTTP POST request to your back end
                axios.post(`${backendUrl}/your-endpoint`, jsonData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    // Handle the response from the back end, if needed
                    console.log('Response from the back end:', response.data);
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                });

                // Continue with any other actions you need to perform based on the coordinates
                setMarkerInPos({ lat: latitude, lng: longitude, height });
            });
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


    // Add this code to log client coordinates
    document.getElementById('cesiumContainer').addEventListener('click', function(event) {
        console.log('Clicked at', event.clientX, event.clientY);
    });

    function convertScreenPixelToLocation(mousePosition) {
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
        if (cartesian) {
            const cartographic = ellipsoid.cartesianToCartographic(cartesian);
            const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(15);
            const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(15);
            return { lat: Number(latitudeString), lng: Number(longitudeString) };
        } else {
            return null;
        }
    }

    function setMarkerInPos(position) {
        viewer.pickTranslucentDepth = true;
        const locationMarker = viewer.entities.add({
            name: 'location',
            position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 300),
            point: {
                pixelSize: 5,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
            },
            label: {
                text: 'check',
                font: '14pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -9),
            },
        });
    }
}

// Call the async function to execute the code
runAsyncCode();

