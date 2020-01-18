<template>
  <div class="navigation">
    <div class="container">
      <ul>
       <li>Home</li>
       <li>Conversations</li>
       <li>Members</li>
       <li>Log out</li>  
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
* {
  background-color: teal;
  color: white;
}
</style>
