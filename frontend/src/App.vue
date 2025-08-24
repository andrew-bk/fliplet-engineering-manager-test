<template>
  <div id="app">
    <header>
      <h1>Vue Drag & Drop Application</h1>
    </header>
    <main>
      <DragDrop />
    </main>
  </div>
</template>

<script>
import DragDrop from './components/drag-drop.vue'

export default {
  name: 'App',
  components: {
    DragDrop
  }
}
</script>

