import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './app.styl'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <RouterView />
      </>
    )
  }
})
