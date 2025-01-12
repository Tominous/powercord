module.exports = {
  command: 'enable',
  description: 'Allows you to re-/enable a selected plugin from the given list.',
  usage: '{c} [ plugin ID ]',

  func (args) {
    let result;

    if (powercord.pluginManager.plugins.has(args[0])) {
      if (powercord.pluginManager.isEnabled(args[0])) {
        result = `->> ERROR: Tried to load an already loaded plugin!
            (${args[0]})`;
      } else {
        powercord.pluginManager.enable(args[0]);
        result = `+>> SUCCESS: Plugin loaded!
            (${args[0]})`;
      }
    } else {
      result = `->> ERROR: Tried to enable a non-installed plugin!
          (${args[0]})`;
    }

    return {
      send: false,
      result: `\`\`\`diff\n${result}\`\`\``
    };
  },

  autocompleteFunc (args) {
    const plugins = powercord.pluginManager.getPlugins()
      .sort((a, b) => a - b)
      .map(plugin => powercord.pluginManager.plugins.get(plugin));

    if (args.length > 1) {
      return false;
    }

    return {
      commands: plugins
        .filter(plugin => plugin.pluginID.includes(args[0].toLowerCase()))
        .map(plugin => ({
          command: plugin.pluginID,
          description: plugin.manifest.description
        }))
        .slice(0, 10),
      header: 'powercord plugin list'
    };
  }
};
