<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <VCol>
        <VCard variant="flat">
          <VCardTitle>Welcome</VCardTitle>
          <VCardText>
            <div>Create your AI session now</div>
            <div class="grid">
              <VBtn variant="outlined" to="/new?type=chat">Chat</VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
