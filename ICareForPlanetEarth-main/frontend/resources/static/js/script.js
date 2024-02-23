async function runAsyncCode() {
    // Your access token can be found at: https://ion.cesium.com/tokens.
    // This is the default access token from your ion account
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOTNmYmI2ZC02ZmI5LTQ0MmUtYTlmOC0yN2QxZmVhOTdlOGYiLCJpZCI6MTczMDY4LCJpYXQiOjE2OTc5MDUwMjV9.HS79Xg5R4euwQ7SSDuZfaeXnW3V0DYEciz8JvqbmdhQ'; // Replace with your actual access token

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain(),
    });

    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 6000000;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 18000000;


    const cesiumContainer = document.getElementById('cesiumContainer');
    const backgroundColor = getComputedStyle(cesiumContainer).backgroundColor;

    // Set the background color of the body
    document.body.style.backgroundColor = backgroundColor;

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);

    // Add your context menu event listener
    viewer.scene.canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
        const selectedLocation = convertScreenPixelToLocation(mousePosition);
        setMarkerInPos(selectedLocation);
    }, false);

    // Add a left-click event listener to get the coordinates
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

