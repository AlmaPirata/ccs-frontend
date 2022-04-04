<template>
    <table class="cart">
        <thead>
        <tr>
            <th>Наименование товара и описание</th>
            <th>Количество</th>
            <th>Цена</th>
        </tr>
        </thead>
        <tbody>
            <slot>
                <tr>
                    <td>Корзина пуста</td>
                </tr>
            </slot>
        </tbody>
    </table>
</template>

<script>
export default {
}
</script>

<style scoped>
.cart th {
    text-align: left;
    padding: 5px;
}
</style>