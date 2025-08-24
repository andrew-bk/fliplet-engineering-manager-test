<template>
  <div>
    <h3>Drag & Drop Components</h3>
    <div class="library">
      <button draggable="true" @dragstart="dragStart('Text')">Text</button>
      <button draggable="true" @dragstart="dragStart('Button')">Button</button>
    </div>
    <div class="preview" @drop="drop" @dragover.prevent>
      <template v-for="(item, index) in items" :key="index">
        <!-- Text Input -->
        <input 
          v-if="item === 'Text'"
          v-bind="getComponentProps(item)"
          :key="`text-${index}`"
        />
        <!-- Button -->
        <button 
          v-else-if="item === 'Button'"
          v-bind="getComponentProps(item)"
          :key="`button-${index}`"
        >
          {{ getComponentContent(item) }}
        </button>
        <!-- Fallback for other types -->
        <span 
          v-else
          :key="`fallback-${index}`"
        >
          {{ item }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "DragDrop",
  data() {
    return { items: [] };
  },
  methods: {
    dragStart(type) {
      event.dataTransfer.setData("text/plain", type);
    },
    drop(event) {
      let type = event.dataTransfer.getData("text/plain");
      this.items.push(type);
    },
    getComponentType(item) {
      const componentMap = {
        'Text': 'input',
        'Button': 'button'
      };
      return componentMap[item] || 'span';
    },
    getComponentProps(item) {
      const propsMap = {
        'Text': {
          type: 'text',
          placeholder: 'Enter text here...',
          class: 'text-input'
        },
        'Button': {
          type: 'button',
        }
      };
      return propsMap[item] || {};
    },
    getComponentContent(item) {
      const contentMap = {
        'Text': '',
        'Button': 'Click me'
      };
      return contentMap[item] || item;
    }
  }
};
</script>

<style>
.library { margin-bottom: 10px; }
.preview { min-height: 100px; border: 1px dashed black; padding: 10px; }

.text-input {
  display: block;
  margin: 10px 0;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

</style>