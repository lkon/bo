<!-- USER-STATE  (BEGIN) -->
<form action="" class="js-popup users-form popup">
    <i class="arr"></i>

    <a href="#" class="exit icon-remove js-exit"></a>

    <ol class="hint">
        <li>Выберите проекты для назначения пользователю.</li>
        <li>Для каждого выбранного проекта определите права пользователя.</li>
    </ol>

    <table class="table table-condensed">
        <tr>
            <td></td>
            <td>Администратор</td>
            <td>Модератор</td>
        </tr>
        <tr>
            <td>
                <label class="checkbox inline">
                    <input type="checkbox" name="projects" value="rbcdaily"> RBC Daily
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="rbcdaily" value="admin">
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="rbcdaily" value="moder">
                </label>
            </td>
        </tr>
        <tr>
            <td>
                <label class="checkbox inline">
                    <input type="checkbox" name="projects" value="realty"> Недвижимость
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="realty" value="admin">
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="realty" value="moder">
                </label>
            </td>
        </tr>
        <tr>
            <td>
                <label class="checkbox inline">
                    <input type="checkbox" name="projects" value="sport"> Спорт
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="sport" value="admin">
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="sport" value="moder">
                </label>
            </td>
        </tr>
        <tr>
            <td>
                <label class="checkbox inline">
                    <input type="checkbox" name="projects" value="style"> Стиль
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="_style" value="admin">
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="_style" value="moder">
                </label>
            </td>
        </tr>
        <tr>
            <td>
                <label class="checkbox inline">
                    <input type="checkbox" name="projects" value="tata"> Tata
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="tata" value="admin">
                </label>
            </td>
            <td>
                <label class="checkbox inline">
                    <input type="radio" name="tata" value="moder">
                </label>
            </td>
        </tr>
    </table>
    <div class="users-form__submit-wrap">
    	<input type="submit" class="users-form__submit" value="Добавить"/>
    </div>
</form>
<!-- USER-STATE  (END) -->