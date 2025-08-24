<template>
  <div>
    <h3>Drag & Drop Components</h3>
    <div class="library">
      <button draggable="true" @dragstart="dragStart('Text')">Text</button>
      <button draggable="true" @dragstart="dragStart('Button')">Button</button>
    </div>
    <div class="preview" @drop="drop" @dragover.prevent>
      <p v-for="item in items" :key="item">{{ item }}</p>
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
    }
  }
};
</script>

<style>
.library { margin-bottom: 10px; }
.preview { min-height: 100px; border: 1px dashed black; padding: 10px; }
</style>