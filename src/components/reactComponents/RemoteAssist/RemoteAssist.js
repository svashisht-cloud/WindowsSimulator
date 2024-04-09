// Copyright 2022 Outrider Technologies, Inc.  CONFIDENTIAL.

import { useEffect, useRef, useState } from "react";

import rosInterposer from "../../../../ros/ros-interposer";
import Octomap from "../../../../visuals/3d-objects/octomap";
import Scene from "../../../../visuals/3d-objects/scene";
import TCArm from "../../../../visuals/3d-objects/tc-arm";
import URDFModel from "../../../../visuals/3d-objects/urdf-model";

const Tc3DViewer = (props) => {
  const callbackHandle = `Tc3DViewer${props.config.id}`;

  const viewerDiv = useRef(null);
  const scene = useRef(null);
  const tcArm = useRef(null);
  const octomap = useRef(null);
  const truck = useRef(null);

  const [displayAlert, setDisplayAlert] = useState(
    !rosInterposer.tcManager.connection
  );

  // Add in callbacks for all related TC managers
  useEffect(() => {
    // Configure callback for Octomap manager and subscribe to topics
    const octomapCallback = () => {
      if (octomap.current) {
        octomap.current.renderOctomap(rosInterposer.octomapManager.voxels);
      }
    };

    rosInterposer.octomapManager.registerUpdateCallback(
      callbackHandle,
      octomapCallback
    );
    rosInterposer.octomapManager.subscribe();

    // Configure callback for TC manager and subscribe to topics
    const tcCallback = () => {
      // Show the alert when the TC manager does not have a connection
      setDisplayAlert(!rosInterposer.tcManager.connection);

      const { connection, jointAngles, position, rotation } =
        rosInterposer.tcManager;
      tcArm.current.updateState(connection, jointAngles, position, rotation);
    };

    rosInterposer.tcManager.registerUpdateCallback(callbackHandle, tcCallback);
    rosInterposer.tcManager.subscribe();

    return () => {
      rosInterposer.tcManager.unsubscribe();
      rosInterposer.tcManager.unregisterUpdateCallback(callbackHandle);
      rosInterposer.octomapManager.unsubscribe();
      rosInterposer.octomapManager.unregisterUpdateCallback(callbackHandle);
    };
  }, []);

  const updateViewerSize = () => {
    if (scene.current) {
      scene.current.resize(
        viewerDiv.current.offsetWidth,
        viewerDiv.current.offsetHeight
      );
    }
  };

  // Attempt to resize three js scene (only updates if size has changed)
  useEffect(() => {
    updateViewerSize();
  });

  // Initialize a scene and 3D objects as well as add handler for window resize events
  useEffect(() => {
    scene.current = new Scene(viewerDiv.current);
    // TODO(jabel): make camera/controls init part of scene constructor
    scene.current.camera.position.set(-1, 6, 4);
    scene.current.controls.target.set(2, 0, 1);
    scene.current.controls.update();

    truck.current = new URDFModel(
      scene.current,
      "urdf/gp7_vehicle_adapter_template.urdf"
    );
    tcArm.current = new TCArm(scene.current, "urdf/gp7.urdf");
    octomap.current = new Octomap(scene.current);

    window.addEventListener("resize", updateViewerSize);

    return () => {
      window.removeEventListener("resize", updateViewerSize);
      scene.current.cleanup();
    };
  }, []);

  const getConnectionAlertBanner = () => {
    if (displayAlert) {
      return (
        <div
          style={{
            width: "100%",
            padding: "5px 10px",
            position: "absolute",
            top: "0",
            color: "#c23030",
            backgroundColor: "#293742",
            opacity: "0.7",
          }}
        >
          <b>Warning: No connection to TC topics</b>
        </div>
      );
    }
  };

  return (
    <>
      {getConnectionAlertBanner()}
      <div
        id={`tc-3d-viewer-${props.config.id}`}
        ref={viewerDiv}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </>
  );
};

export default Tc3DViewer;
