/**
 * NOTE: 
 * 
 * This file defines menu entries for your plugin, if you do not need these, 
 * remove the ../menu folder as well as the menu reference in the root index file (plugin entry point).
 * 
 * You may define as many entries as you would like, here we enable the first when 
 * focusing a Camunda Platform/7 BPMN diagram and the second on any BPMN diagram. Accelerator are 
 * always optional.
 * 
 * Menu plugins have some quirks so we advise visiting our documentation for more information at
 * https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins/
 */


module.exports = function (electronApp, menuState, Modal) {
  return [{
    label: 'Generate a dynamic documentation in Word',
    accelerator: 'CommandOrControl+d',
    enabled: () => menuState.bpmn,
    action: function() {
      electronApp.emit('menu:action', 'emit-event', {
        type: 'documentation-generator-plugin:loadTemplate'
      });
    }
  },
    {
      label: 'Help',
      enabled: () => menuState.bpmn,
      action: function() {
        electronApp.emit('menu:action', 'emit-event', {
          type: 'documentation-generator-plugin:openHelpModal'
        });
      }
    }]
}
