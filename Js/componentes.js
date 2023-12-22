AFRAME.registerComponent('select', {
    init: function () {
      var originalColor = this.el.getAttribute('material').color
      var originalPosition = this.el.getAttribute("position")

      var self = this;
      this.el.sceneEl.addEventListener('click', function (evt) {
        if (evt.detail.intersectedEl === undefined) { return; }
        
        let color = evt.detail.intersectedEl === self.el ? 'green' : originalColor
        self.el.setAttribute('color', color)
        
        let pos = evt.detail.intersectedEl === self.el ? {x: originalPosition.x, y: 3, z: originalPosition.z} :  {x: originalPosition.x, y: 2, z: originalPosition.z}
        self.el.setAttribute('position', pos);
      }, false);
    }
  });