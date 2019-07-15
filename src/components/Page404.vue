<template>
<div class="container pt-2">
	<div class="form-group row">			
		<div class="col-md-3" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Back</router-link>
		</div>
		<div class="col-md-3" >
			<h3>The Page is not found</h3>
			<h3>Error 404</h3>
		</div>
		<div class="col-md-3" >
			
		</div>
    </div>  
</div>
</template>
<script>


export default {
 
  }

</script>

<style>
 h3 {
        text-align: center;
		color: red;
    }
</style>